const userService = require('../service/userService');
const bcrypt = require("bcrypt");
const User = require('../database/models/userModel');
const constants = require('../constants');

module.exports.createUser = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.createUser(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_CREATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: createUser', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.login = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.login(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_LOGIN;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: login', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getProfileById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.getProfileById(req.query.id);
        response.status = 200;
        response.message = constants.userMessage.USER_PROFILE_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getProfileById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateProfileById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.updateProfileById({
            id: req.query.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.userMessage.USER_PROFILE_UPDATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: updateProfileById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteProfileById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.deleteProfileById(req.query.id);
        response.status = 200;
        response.message = constants.userMessage.USER_PROFILE_DELETED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: deleteProfileById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.checkCode = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await userService.checkCode(req.body);
        response.status = 200;
        response.message = constants.userMessage.USER_ACTIVATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: checkCode', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.changePassword = async (req,res) => {
    try {
        let user_id = req.query.id;
        let { password, newPassword } = req.body;
        if (!password || !newPassword) return res.send({
            code: 400,
            message: 'Kindly fill all inputs',
            data: {}
        });
        let user = await User.findOne({ user_id });
        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.send({
            code: 400,
            message: "Wrong Password",
            data: {}
        });
        user = await updatePassword(user_id, newPassword)
        res.send({error: 200,
            message: "Password successfully changed,login now",
            data: {}
        });
    } catch (error) {
        res.send({
            code: 400,
            message: "An Error Occurred",
            data: { error }
        });
    }
}

const updatePassword = async (user_id, newPassword) => {
    try {
      let password = await bcrypt.hash(newPassword, 12);
      let newUser = await User.findOneAndUpdate({ user_id }, { password });
      return ({
        error: 200,
        message: "Password Updated",
        data: { newUser }
      });
    } catch (error) {
      return ({
        error: 401,
        message: "An error occurred",
        data: {}
      });
    }
  }
