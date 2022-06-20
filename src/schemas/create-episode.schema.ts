import Joi from 'joi';

export const createEpisodeSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().required(),
    duration: Joi.number().required(),
    showId: Joi.number().required(),
});
