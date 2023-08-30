import dayjs from "dayjs";
import {
  findCityDB,
  getFlightsDB,
  postFlightDB,
} from "../repositories/flightsRepository.js";

export async function postFlight(req, res) {
  const { origin, destination, date } = req.body;

  try {
    const originExistsResult = await findCityDB(origin);
    const destinationExistsResult = await findCityDB(destination);

    if (
      originExistsResult.rowCount === 0 ||
      destinationExistsResult.rowCount === 0
    ) {
      return res.status(404).send("Este id não existe no banco de cidades");
    }

    if (origin === destination) {
      return res
        .status(409)
        .send(
          "O local de origem/destino da viagem precisa ser diferente entre si"
        );
    }

    const currentDate = new Date();
    const formattedDateParts = date.split("-");
    const inputDate = new Date(
      formattedDateParts[2],
      formattedDateParts[1] - 1,
      formattedDateParts[0]
    );

    if (inputDate <= currentDate) {
      return res
        .status(422)
        .send("A data do voo deve ser maior do que a data atual");
    }

    await postFlightDB(origin, destination, inputDate);
    res.status(201).send("Voo cadastrado com sucesso!");
  } catch (error) {
    console.log("Erro em postFlight", error);
    return res.status(500).send(error);
  }
}

export async function getFlights(req, res) {
  try {
    const data = await getFlightsDB();
    return res.send(data.rows);
  } catch (error) {
    console.log("Error em getFlights:", error);
    return res.status(500).send(error);
  }
}
