import joi from "joi";

export const passengerSchema = joi.object({
  firstName: joi.string().min(2).max(100).required().trim(),
  lastName: joi.string().min(2).max(100).required().trim(),
});
