import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { citySchema } from "../schemas/citiesSchema.js";
import * as citiesController from "../controllers/citiesController.js"

const citiesRouter = Router()
citiesRouter.post("/cities", validationschema(citySchema), citiesController.postCities);

export default citiesRouter