import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const joiOptions = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const createOrderValidation = celebrate(
  {
    [Segments.BODY]: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            productId: Joi.string().uuid().required(),
            quantity: Joi.number().required().integer().positive(),
          }).required()
        )
        .min(1)
        .required(),
      userId: Joi.string().required().uuid(),
      addressId: Joi.string().required().uuid(),
    }),
  },
  joiOptions
);

export const getProductIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});
