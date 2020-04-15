const User = require('../database/models/userModel');
const constants = require('../constants');
const { formatMongoData, chkObjectId} = require('../helper/dbHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.createUser = async ({name, email, phoneNumber, password}) => {
    try{
        let user = await User.findOne({ email });
        if(user){
            throw new Error(constants.userMessage.DUPLICATE_USER);
        }

        password = await bcrypt.hash(password, 12);

        const newUser = new User ({name, email, phoneNumber, password});
        let result = await newUser.save();
        return formatMongoData(result);

    } catch (error){
        console.log('Something went wrong: Service: userController', error);
        throw new Error(error);
    }
}

   
module.exports.login = async ({email, phoneNumber, password}) => {
    try{
        let user = await User.findOne({ $or: [{ email }, {phoneNumber}]});
        if(!user){
            throw new Error(constants.userMessage.USER_NOT_FOUND);
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
