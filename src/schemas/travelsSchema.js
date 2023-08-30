import joi from "joi";

export const travelSchema = joi.object({
   passengerId: joi.number().required(),
    flightId: joi.number().required(),
  });