import * as travelsRepository from '../repositories/travelsRepository.js';
import {notFoundError} from "../errors/errors.js"


async function postTravelService(passengerId, flightId) {
    const passengerIdExistsResult = await travelsRepository.findPassengerDB(passengerId);
    const flightIdExistsResult = await travelsRepository.findFlightDB(flightId);

    if (passengerIdExistsResult.rowCount === 0 || flightIdExistsResult.rowCount === 0) throw notFoundError('Este id de passageiros e/ou viagens não existe')
  
    return travelsRepository.postTravelDB(passengerId, flightId);
 
}

export {
    postTravelService,
}

