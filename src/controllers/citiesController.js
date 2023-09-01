import * as citiesService from "../services/citiesService.js";
import httpStatus from "http-status";


export async function postCities(req, res) {
  const { name } = req.body;

    const city = await citiesService.postCityService(name);

    if (city === null) {
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    res.sendStatus(httpStatus.CREATED);
}
