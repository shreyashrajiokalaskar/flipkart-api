import { celebrate, Joi, Segments } from "celebrate";
import { ROLES } from "shared/common.enum";

export const createUserValidation = celebrate({
    [Segments.BODY] : Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid(ROLES.BUYER, ROLES.SELLER),
    }) 
});

export const loginValidation = celebrate({
    [Segments.BODY] : Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
})
