import { celebrate, Joi, Segments } from "celebrate";
const joiOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const getUserByIdValidation = celebrate(
  {
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  },
  joiOptions
);

export const updateUserValidation = celebrate(
  {
    [Segments.BODY]: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      phone: Joi.string(),
    }),
  },
  joiOptions
);
