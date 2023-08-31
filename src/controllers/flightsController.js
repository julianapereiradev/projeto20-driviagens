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

    const currentDate = new Date(); //já está convertido em objeto Date
    const dateParts = date.split("-"); // Separar os componentes da data
    const inputDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    ); // Converter para objeto Date
    const timeDifference = inputDate - currentDate;

    if (timeDifference <= 0) {
      return res
        .status(422)
        .send("A data do voo deve ser maior do que a data atual");
    }

    await postFlightDB(origin, destination, date);
    res.status(201).send("Voo cadastrado com sucesso!");
  } catch (error) {
    console.log("Erro em postFlight", error);
    return res.status(500).send(error);
  }
}

export async function getFlights(req, res) {
  try {
    const originCity = req.query.origin;
    const destinationCity = req.query.destination;

    const smallerDate = req.query["smaller-date"];
    const biggerDate = req.query["bigger-date"];

    if ((smallerDate && !biggerDate) || (!smallerDate && biggerDate)) {
      return res
        .status(422)
        .send(
          "Ambos os parâmetros (smartDate e biggerDate) precisam ser passados juntos."
        );
    }

    if (smallerDate && biggerDate) {
      const smallerDateParts = smallerDate.split("-");
      const inputSmallerDate = new Date(
        `${smallerDateParts[2]}-${smallerDateParts[1]}-${smallerDateParts[0]}`
      ); // Converter para objeto Date

      const biggerDateParts = biggerDate.split("-");
      const inputBiggerDate = new Date(
        `${biggerDateParts[2]}-${biggerDateParts[1]}-${biggerDateParts[0]}`
      ); // Converter para objeto Date

      if (
        inputSmallerDate &&
        inputBiggerDate &&
        inputSmallerDate > inputBiggerDate
      ) {
        return res
          .status(400)
          .send(
            "A data menor (smaller-date) não pode ser posterior à data maior (bigger-date)."
          );
      }
    }

    const data = await getFlightsDB(
      originCity,
      destinationCity,
      smallerDate,
      biggerDate
    );

   // Formatar as datas no formato "DD-MM-YYYY" antes de enviar a resposta
   const formattedData = data.rows.map(flight => {
    const flightDate = new Date(flight.date);
    const day = flightDate.getDate().toString().padStart(2, '0');
    const month = (flightDate.getMonth() + 1).toString().padStart(2, '0'); // Mês começa de 0
    const year = flightDate.getFullYear();

    return {
      id: flight.id,
      origin: flight.origin,
      destination: flight.destination,
      date: `${day}-${month}-${year}`
    };
  });

  if (destinationCity && formattedData.length === 0) {
    return res.status(404).send("Not found");
  }

  return res.send(formattedData);
  } catch (error) {
    console.log("Error em getFlights:", error);
    return res.status(500).send(error);
  }
}
