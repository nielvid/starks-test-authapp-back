const Joi = require("@hapi/joi"); //using @hapi/joi to validate user input

//validate users info
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    tel: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};
//validate login details info
const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation, LoginValidation
};