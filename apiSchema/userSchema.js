const Joi = require ('@hapi/joi');

module.exports.createUserSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ng'] } }).required(),
    password: Joi.string().min(5).max(255).required(),
    phoneNumber: Joi.string().min(10).max(13).required()
})

module.exports.login = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ng'] } }),
    phoneNumber: Joi.string().min(10).max(13),
    password: Joi.string().min(5).max(255).required()
})

module.exports.updateUserSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ng'] } }),
    password: Joi.string().min(5).max(255),
    phoneNumber: Joi.string().min(10).max(13)
})