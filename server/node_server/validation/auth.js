import Joi from "joi";

export const loginValidation = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

export const registerValidation = Joi.object({
    fullname: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

export const forgotPassoword = Joi.object({
    email: Joi.string().email().required()
});


export const emailValidationSchema = Joi.object({
    email: Joi.string().email().required(),
});