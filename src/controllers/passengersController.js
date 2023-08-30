import { postPassengerDB } from "../repositories/passengersRepository.js";

export async function postPassenger(req, res) {
  const { firstName, lastName } = req.body;

  try {
    await postPassengerDB(firstName, lastName);

    res.status(201).send("Passageiro Cadastrado");
  } catch (error) {
    console.log("Erro em postPassenger", error);
    return res.status(500).send(error);
  }
}

export async function getPassengersTravelQty(req, res) {
  //
}
