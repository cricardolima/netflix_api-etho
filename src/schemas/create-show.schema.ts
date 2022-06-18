import Joi from 'joi';
import ShowCategory from '../enums/show-category.enum';

export const createShowSchema = Joi.object().keys({
    title: Joi.string().required(),
    director: Joi.string().required(),
    actors: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid(...Object.values(ShowCategory)),
    cover: Joi.string().required(),
});
