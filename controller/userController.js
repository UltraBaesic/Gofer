const userService = require('../service/userService');
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
        const responseFromService = await userService.getProfileById(req.params);
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
            id: req.params.id,
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
        const responseFromService = await userService.deleteProfileById(req.params);
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