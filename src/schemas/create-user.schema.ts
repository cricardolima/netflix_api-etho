import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
