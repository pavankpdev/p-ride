import Joi from "joi";

export const bookCabValidation = Joi.object({
  pickup: Joi.string().required(),
  drop: Joi.string().required(),
});
