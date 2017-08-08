import Joi = require('joi');

export const addressDTO = Joi.object().keys({
  number: Joi.number().required(),
  name: Joi.string().required(),
  suburb: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});
