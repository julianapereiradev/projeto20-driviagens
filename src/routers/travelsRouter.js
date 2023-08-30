import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { postTravel } from "../controllers/travelsController.js";
import { travelSchema } from "../schemas/travelsSchema.js";

const travelsRouter = Router()
travelsRouter.post("/travels", validationschema(travelSchema), postTravel);

export default travelsRouter