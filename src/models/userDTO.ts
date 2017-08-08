import Joi = require('joi');

export const userDTO = Joi.object().keys({
  Id: Joi.string().required(),
  name: Joi.string().min(3).max(300).required(),
  dob: Joi.date().required(),
  email: Joi.string().email().required(),
  sex: Joi.string().optional(),
});
