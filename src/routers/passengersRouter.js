import { Router } from "express";
import { validationschema } from "../middlewares/validationSchema.js";
import { passengerSchema } from "../schemas/passengersSchema.js";
import * as passengersController from "../controllers/passengersController.js"

const passengersRouter = Router()
passengersRouter.post("/passengers", validationschema(passengerSchema), passengersController.postPassenger);
passengersRouter.get("/passengers/travels", passengersController.getPassengersTravelQty);

export default passengersRouter