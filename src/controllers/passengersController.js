import * as passengersService from "../services/passengersService.js";
import httpStatus from "http-status";


export async function postPassenger(req, res) {
  const { firstName, lastName } = req.body;
 
    const passenger = await passengersService.postPassengerService(firstName, lastName);

    if (passenger  === null) {
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    res.sendStatus(httpStatus.CREATED);
}

export async function getPassengersTravelQty(req, res) {
    const name = req.query.name || "";
    const page = req.query.page !== undefined ? parseInt(req.query.page) : 1;


    const passengers = await passengersService.getPassengersTravelQtyService(name, page);

    if (passengers  === null) {
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    res.status(httpStatus.CREATED).send(passengers);
}
