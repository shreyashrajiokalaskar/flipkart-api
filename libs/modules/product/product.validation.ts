import { celebrate, Segments } from "celebrate";
import Joi from "joi";
import { SORT_DIRECTION } from "shared/common.enum";

export const filterProductsValidation = celebrate({
  [Segments.BODY]: Joi.object({
    category: Joi.string().optional(),
    brand: Joi.string().optional(),
    rating: Joi.number().min(1).max(5).optional(),
    priceRange: Joi.object({
      min: Joi.number().min(1).optional(),
      max: Joi.number().greater(Joi.ref("min")).optional(),
    }).optional(),
    sort: Joi.object({
      direction: Joi.string()
        .valid(SORT_DIRECTION.ASC, SORT_DIRECTION.DESC)
        .default(SORT_DIRECTION.DESC)
        .optional(),
      columnName: Joi.string().default("rating").optional(),
    }).optional(),
  }),
});
