import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { flightSchema } from "../schemas/flightsSchema.js";
import * as flightsController from "../controllers/flightsController.js"

const flightsRouter = Router()
flightsRouter.post("/flights", validationschema(flightSchema), flightsController.postFlight);
flightsRouter.get("/flights", flightsController.getFlights);

export default flightsRouter