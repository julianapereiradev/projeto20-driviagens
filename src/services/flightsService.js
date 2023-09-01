import { conflictError, notFoundError, unprocessableEntity } from "../errors/errors.js";
import * as flightsRepository from "../repositories/flightsRepository.js"
  
  async function validateFlightDate(date) {
    const currentDate = new Date();
    const dateParts = date.split("-");
    const inputDate = new Date(
    `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    );
    const timeDifference = inputDate - currentDate;
  
    if (timeDifference <= 0) throw unprocessableEntity('A data do voo deve ser maior do que a data atual')
  }
  
  
  async function validateSearchParams(origin, destination) {
    const originExistsResult = await flightsRepository.findCityDB(origin);
    const destinationExistsResult = await flightsRepository.findCityDB(destination);
  
    if (originExistsResult.rowCount === 0 || destinationExistsResult.rowCount === 0) throw notFoundError('A cidade de origem e destino devem ser ids de cidades que existem')
  
    if (origin === destination) throw conflictError('Origem e destino devem ser diferentes')
  }

  
  async function postFlightService(origin, destination, date) {
    
      await validateSearchParams(origin, destination);
      await validateFlightDate(date);
  
      return flightsRepository.postFlightDB(origin, destination, date);
    
  }
  
  export {
    postFlightService,
  };
  