const Joi = require ('@hapi/joi');

module.exports.createErrandSchema = Joi.object().keys({
    userId: Joi.string(),
    category: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string(),
    amount: Joi.string().required(),
    deadlineDate: Joi.string(),
    deadlineTime: Joi.string(),
    insurance: Joi.string(),
    status: Joi.string()
});

module.exports.getAllErrandSchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateErrandSchema = Joi.object().keys({
    userId: Joi.string(),
    categoryId: Joi.string(),
    address: Joi.string(),
    location: Joi.string(),
    description: Joi.string(),
    amount: Joi.string(),
    deadlineDate: Joi.string(),
    deadlineTime: Joi.string(),
    insurance: Joi.string(),
    errandRunner: Joi.string(),
    status: Joi.string()
});

module.exports.categorySchema = Joi.object().keys({
  categoryName: Joi.string().required()
});