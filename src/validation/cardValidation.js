import Joi from "joi";
import validation from "./validation";

const cardSchema = Joi.object({
  title: Joi.string().required().min(2).max(256),
  subtitle: Joi.string().min(2).max(256).required(),
  phone: Joi.string().required().min(9).max(11),
  description: Joi.string().required().min(2).max(256),
  web: Joi.string().allow("").min(2).max(256),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(5),
  url: Joi.string().min(14).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(2).max(256).required(),
  zip: Joi.number().min(2).allow(""),
});

const validateCard = (inputToCheck) => validation(cardSchema, inputToCheck);

export { validateCard };
