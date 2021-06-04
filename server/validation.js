//VALIDATION
const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

const markdownCreateValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(0).required(),
    markdown: Joi.string().min(0).required()
  });
  return schema.validate(data);
};

const markdownUpdateValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    markdown: Joi.string().min(0).required()
  });
  return schema.validate(data);
};

const markdownDeleteValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });
  return schema.validate(data);
};



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.markdownCreateValidation = markdownCreateValidation;
module.exports.markdownUpdateValidation = markdownUpdateValidation;
module.exports.markdownDeleteValidation = markdownDeleteValidation;
