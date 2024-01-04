import Joi from 'joi';

export const bookSchemaValidator = Joi.object({
    bookTitle: Joi.string().required(),
    bookAuthor: Joi.string().required(),
    bookImage: Joi.string().required(),
    bookPrice: Joi.number().min(0),
    bookPublished: Joi.date().required(),
    bookAvailability: Joi.number().min(0)
  });