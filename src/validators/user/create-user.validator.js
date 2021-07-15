const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(1)
        .max(50)
        .allow('X Æ A-Xii'),
    email: Joi.string().regex(regexpEnum.EMAIL).required(),
    password: Joi.string().trim().regex(regexpEnum.PASSWORD).required()
});
