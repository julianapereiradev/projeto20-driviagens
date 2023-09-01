import { badRequest, internalServerError } from '../errors/errors.js';
import * as passengersRepository from '../repositories/passengersRepository.js';

async function postPassengerService(firstName, lastName) {

  return passengersRepository.postPassengerDB(firstName, lastName);
}


async function validatePage(page) {
  if (isNaN(page) || page <= 0) throw badRequest('Invalid page value')
}

function calculateOffsetAndLimit(page, limit) {
  const offset = (page - 1) * limit;
  return { offset, limit };
}

async function getPassengersTravelQtyService(name, page) {
  await validatePage(page);

  const limit = 10;
  const { offset } = calculateOffsetAndLimit(page, limit);

  const data = await passengersRepository.getPassengersTravelQtyDB(limit, offset, name);

  if (data.rows.length > 10) throw internalServerError('Too many results')

  return data.rows;
}

export {
    postPassengerService,
    getPassengersTravelQtyService
}

