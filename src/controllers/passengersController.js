import {
  getPassengersTravelQtyDB,
  postPassengerDB,
} from "../repositories/passengersRepository.js";

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
