const Joi = require('joi');

const { regexEnum } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string().regex(regexEnum.EMAIL).required(),
    password: Joi.string().regex(regexEnum.PASSWORD).required()
});
