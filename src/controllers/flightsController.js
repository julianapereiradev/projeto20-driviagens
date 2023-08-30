import { db } from "../database/database.js";
import dayjs from "dayjs";

  export async function postFlight(req, res) {
    const { origin, destination, date } = req.body;

    try {
// Verificar se a cidade de origem existe na tabela "cities"
const originExistsQuery = `
  SELECT * FROM cities WHERE id = $1;
`;
const originExistsValues = [origin];
const originExistsResult = await db.query(originExistsQuery, originExistsValues);

// Verificar se a cidade de destino existe na tabela "cities"
const destinationExistsQuery = `
  SELECT * FROM cities WHERE id = $1;
`;
const destinationExistsValues = [destination];
const destinationExistsResult = await db.query(destinationExistsQuery, destinationExistsValues);

if (originExistsResult.rowCount === 0 || destinationExistsResult.rowCount === 0) {
  return res.status(404).send("Este id nao existe em cidades");
}

// Verificar se os IDs de origem e destino são diferentes entre si
if (origin === destination) {
  return res.status(409).send("A origem e o destino do local precisam ser diferentes entre si")
}

 // Verificar se a data é maior que a data atual
 const currentDate = dayjs(); // Obtém a data e hora atuais
 const formattedCurrentDate = currentDate.format('DD-MM-YYYY');

 const inputDate = date;

 console.log("Como chega a formattedCurrentDateatual:", formattedCurrentDate)
 console.log("Como chega a data que eu postei:", inputDate)

 if (inputDate <= formattedCurrentDate) {
   return res.status(422).send("A data tem q ser superior a data de hoje");
 }

  res.status(200).send("Deu certo")

    } catch (error) {
      console.log('Erro em postFlight', error);
      return res.status(500).send(error);
    }
  }

  export async function getFlights(req, res) {
    //
  }