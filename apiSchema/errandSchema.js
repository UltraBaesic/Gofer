const Joi = require ('@hapi/joi');

module.exports.createErrandSchema = Joi.object().keys({
    posterID: Joi.string().required(),
    category: Joi.string().required(),
    pickupLocation: Joi.string().required(),
    deliveryLocation: Joi.string().required(),
    description: Joi.string(),
    amount: Joi.string().required(),
    deadlineDate: Joi.date(),
    insurance: Joi.string(),
    status: Joi.string()
})

module.exports.getAllErrandSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
})

module.exports.updateErrandSchema = Joi.object().keys({
    posterID: Joi.string(),
    category: Joi.string(),
    pickupLocation: Joi.string(),
    deliveryLocation: Joi.string(),
    description: Joi.string(),
    amount: Joi.string(),
    deadlineDate: Joi.date(),
    insurance: Joi.string(),
    status: Joi.string()
});