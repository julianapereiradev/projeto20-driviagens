import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { travelSchema } from "../schemas/travelsSchema.js";
import * as travelsController from "../controllers/travelsController.js"

const travelsRouter = Router()
travelsRouter.post("/travels", validationschema(travelSchema), travelsController.postTravel);

export default travelsRouter