import baseJoi from 'joi';
import joiDate from "@joi/date";

const joi = baseJoi.extend(joiDate) 

export const flightSchema = joi.object({
    origin: joi.number().required(),
    destination: joi.number().required(),
    date: joi.date().format("DD-MM-YYYY").required(),
});