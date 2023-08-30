import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { citySchema } from "../schemas/citiesSchema.js";
import { postCities } from "../controllers/citiesController.js";

const citiesRouter = Router()
citiesRouter.post("/cities", validationschema(citySchema), postCities);

export default citiesRouter