import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { passengerSchema } from "../schemas/passengersSchema.js";
import { getPassengersTravelQty, postPassenger } from "../controllers/passengersController.js";

const passengersRouter = Router()
passengersRouter.post("/passengers", validationschema(passengerSchema), postPassenger);
passengersRouter.get("/passengers/travels", getPassengersTravelQty);

export default passengersRouter