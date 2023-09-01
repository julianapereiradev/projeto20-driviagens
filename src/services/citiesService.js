import * as citiesRepository from '../repositories/citiesRepository.js';
import {conflictError} from "../errors/errors.js"


async function postCityService(name) {
const existCity = await citiesRepository.findRepeatedCityDB(name);
if (existCity.rowCount > 0) throw conflictError('o nome da cidade já existe');

  return citiesRepository.postCityDB(name);
}

export {
    postCityService,
}

