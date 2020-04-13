const Joi = require('@hapi/joi');
const constants = require('../constants/index');

const validateObjectSchema = (data, schema) => {
    const result = Joi.validate(data, schema, {convert: false});
    if(result.error){
        const errorDetails = result.error.details.map(value =>{
            return{
                error: value.message,
                path: value.path
            };
        });
        return errorDetails;
    }
    return null;
}

module.exports.validateBody = (schema) => {
    return (req,res,next) =>{
        let response = { ...constants.defaultServerResponse}
       const chkError =  validateObjectSchema(req.body,schema);
       if(chkError){
            response.body = chkError;
            response.message = constants.requestValidationMessage.REQUEST_MESSAGE;
            return res.status(response.status).send(response);
       }
       return next();
    }
}

module.exports.validateQueryParams = (schema) => {
    return (req,res,next) =>{
        let response = { ...constants.defaultServerResponse}
       const chkError =  validateObjectSchema(req.query,schema);
       if(chkError){
            response.body = chkError;
            response.message = constants.requestValidationMessage.REQUEST_MESSAGE;
            return res.status(response.status).send(response);
       }
       return next();
    }
}