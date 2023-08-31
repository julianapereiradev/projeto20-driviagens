import joi from "joi";

export const flightSchema = joi.object({
    origin: joi.number().required(),
    destination: joi.number().required(),
    date: joi.string().pattern(new RegExp(/^\d{2}-\d{2}-\d{4}$/)).required()
});
