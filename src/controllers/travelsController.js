import { findFlightDB, findPassengerDB, postTravelDB } from "../repositories/travelsRepository.js";

export async function postTravel(req, res)  {

    const { passengerId, flightId} = req.body;
  
    try {
      const passengerIdExistsResult = await findPassengerDB(passengerId);
      const flightIdExistsResult = await findFlightDB(flightId);
  
      if (passengerIdExistsResult.rowCount === 0 || flightIdExistsResult.rowCount === 0) {
        return res.status(404).send("Este id não existe no banco de passageiros ou no voo");
      }
  
  //Para mim não faz sentido validar origin/destination ou o date porque o id flightId já chega aqui com esses tratamentos
  
  await postTravelDB(passengerId, flightId);
  res.status(201).send("Viagem Cadastrada");
  
    } catch (error) {
      console.log("Erro em postTravel", error);
      return res.status(500).send(error);
    }
  }