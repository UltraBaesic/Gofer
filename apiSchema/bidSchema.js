const Joi = require ('@hapi/joi');

module.exports.bidSchema = Joi.object().keys({
  errandId: Joi.string().required(),
  bidder: Joi.string().required(),
  errandPoster: Joi.string().required(),
  amount: Joi.string().required()
});