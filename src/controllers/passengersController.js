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
  try {
    const name = req.query.name || "";
    const page = req.query.page !== undefined ? parseInt(req.query.page) : 1;


    if (isNaN(page) || page <= 0) {
      return res.status(400).send("Invalid page value");
    }

    const limit = 10;
    const offset = (page - 1) * limit;

  const data = await getPassengersTravelQtyDB(limit, offset, name);

    if (data.rows.length > 10) {
      return res.status(500).send("Too many results");
  }
  
    return res.send(data.rows);

  } catch (error) {
    console.log("Error de getPassengersTravelQty:", error);
    return res.status(500).send(error);
  }
}
