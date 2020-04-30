const User = require('../database/models/userModel');
const Request = require('../database/models/phoneVerifyModel');
const constants = require('../constants');
const { formatMongoData, chkObjectId} = require('../helper/dbHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Nexmo = require('nexmo');

const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const NEXMO_BRAND_NAME = process.env.NEXMO_BRAND_NAME;

const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET
}, {
        debug: true
    });

var verifyRequestId = null;
var verifyRequestNumber = null;


module.exports.createUser = async ({name, email, phoneNumber, password}) => {
    try{
        let user = await User.findOne({ email });
        if(user){
            throw new Error(constants.userMessage.DUPLICATE_USER);
        }

        password = await bcrypt.hash(password, 12);

        let newUser = new User ({name, email, phoneNumber, password});
        let result = await newUser.save();
        
        await this.verifyPhone(newUser);
        return formatMongoData(result);

    } catch (error){
        console.log('Something went wrong: Service: userController', error);
        throw new Error(error);
    }
}

   
module.exports.login = async ({email, password, phoneNumber}) => {
    try{
        let user = await User.findOne({ $or: [{ email }, {phoneNumber}]});
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        if (user.status === "pending"){
            await this.verifyPhone(user);
            throw new Error(constants.userMessage.ACTIVATE_USER);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error (constants.userMessage.INVALID_LOGIN);
        }
        const token = jwt.sign({id:user._id }, process.env.SECRET_KEY || 'my_secret_key', {expiresIn: '1d'});

        return {token}; 

    } catch (error){
        console.log('Something went wrong: Service: login', error);
        throw new Error(error);
    }
}

module.exports.getProfileById = async ({ id }) => {
    try{
        chkObjectId(id);
        let user = await User.findById(id);
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error){
        console.log('Something went wrong: Service: getProfileById', error);
        throw new Error(error);
    }
}

module.exports.updateProfileById = async ({ id, updateInfo }) => {
    try{
        chkObjectId(id);
        let user = await User.findOneAndUpdate(
            {_id: id},
            updateInfo,
            { new: true }
            );
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error){
        console.log('Something went wrong: Service: updateProfileById', error);
        throw new Error(error);
    }
}

module.exports.deleteProfileById = async ({ id }) => {
    try{
        chkObjectId(id);
        let user = await User.findByIdAndDelete(id);
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
        }
        return formatMongoData(user);
    } catch (error){
        console.log('Something went wrong: Service: deleteProfileById', error);
        throw new Error(error);
    }
}

module.exports.verifyPhone = async(user) => {
    let nemNumber = user.phoneNumber;
    verifyRequestNumber = "234" + nemNumber.slice(1);
    nexmo.verify.request({
        number: verifyRequestNumber,
        brand: NEXMO_BRAND_NAME,
        code_length: '4'
    }, (err, result) => {
        console.log(result);
        if (err) {
            console.error(err);
        } else {
            verifyRequestId = result.request_id;
            console.log(`request_id: ${verifyRequestId}`);
            let newRequest = new Request({request_id: verifyRequestId, phoneNumber: nemNumber});
            let requ = newRequest.save();
            return requ;
        }
    });
    
}

module.exports.checkCode = async(user) => {
  const id = user.request_id;
    nexmo.verify.check({
        request_id: user.request_id,
        code: user.code
    }, async(err, result) => {
        if (err) {
            console.error(err);
        } else {
            if (result.status == 0) {
              try
              {
                const verifyUser = await Request.findOne({request_id: id});
                const user = await User.findOneAndUpdate({phoneNumber: verifyUser.phoneNumber},
                  {status: "active"},
                  { new: true });
                  return user;
              }catch(error){
                console.log('Something went wrong: Service: checkCode', error);
                throw new Error(error);
              }
            }
        }
    });
}