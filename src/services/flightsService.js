import { badRequest, conflictError, notFoundError, unprocessableEntity } from "../errors/errors.js";
import * as flightsRepository from "../repositories/flightsRepository.js"

let inputDate = null

async function validateFlightDate(date) {
  const currentDate = new Date();
  const dateParts = date.split("-");
   inputDate = new Date(
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


  async function getFormattedFlights(originCity, destinationCity, smallerDate, biggerDate) {
    const data = await flightsRepository.getFlightsDB(originCity, destinationCity, smallerDate, biggerDate);
  
    return data.rows.map(flight => {
      const flightDate = new Date(flight.date);
      const day = flightDate.getDate().toString().padStart(2, '0');
      const month = (flightDate.getMonth() + 1).toString().padStart(2, '0');
      const year = flightDate.getFullYear();
  
      return {
        id: flight.id,
        origin: flight.origin,
        destination: flight.destination,
        date: `${day}-${month}-${year}`
      };
    });
  }

  
  async function postFlightService(origin, destination, date) {
    
      await validateSearchParams(origin, destination);
      await validateFlightDate(date);
  
      return flightsRepository.postFlightDB(origin, destination, inputDate);
    
  }

  async function getFlightsService(originCity, destinationCity, smallerDate, biggerDate) {
    
      if ((smallerDate && !biggerDate) || (!smallerDate && biggerDate)) throw unprocessableEntity('Os parâmetros bigger-date e smaller-date precisam ser passados juntos')

      let inputSmallerDate = null;
      let inputBiggerDate = null;
  
  
      if (smallerDate && biggerDate) {
        const smallerDateParts = smallerDate.split("-");
        inputSmallerDate = new Date(
          `${smallerDateParts[2]}-${smallerDateParts[1]}-${smallerDateParts[0]}`
        );
  
        const biggerDateParts = biggerDate.split("-");
        inputBiggerDate = new Date(
          `${biggerDateParts[2]}-${biggerDateParts[1]}-${biggerDateParts[0]}`
        );
  
        if (inputSmallerDate && inputBiggerDate && inputSmallerDate > inputBiggerDate) throw badRequest('smaller-date não pode ser maior do que a bigger-date')
      }

      return await getFormattedFlights(originCity, destinationCity, inputSmallerDate, inputBiggerDate);
  }
  
  export {
    postFlightService,
    getFlightsService
  };
  