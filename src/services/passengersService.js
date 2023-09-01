import * as passengersRepository from '../repositories/passengersRepository.js';


async function postPassengerService(firstName, lastName) {

  return passengersRepository.postPassengerDB(firstName, lastName);
}

export {
    postPassengerService,
}

