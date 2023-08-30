import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { getFlights, postFlight } from "../controllers/flightsController.js";
import { flightSchema } from "../schemas/flightsSchema.js";

const flightsRouter = Router()
flightsRouter.post("/flights", validationschema(flightSchema), postFlight);
flightsRouter.get("/flights", getFlights);

export default flightsRouter