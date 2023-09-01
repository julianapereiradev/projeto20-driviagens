import httpStatus from "http-status";
import * as travelsService from "../services/travelsService.js"

export async function postTravel(req, res)  {

    const { passengerId, flightId} = req.body;
  
    const travels = await travelsService.postTravelService(passengerId, flightId);

    if (travels === null) {
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    res.sendStatus(httpStatus.CREATED);   
}