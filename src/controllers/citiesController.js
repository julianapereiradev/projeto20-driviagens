import { findRepeatedCityDB, postCityDB } from "../repositories/citiesRepository.js";

  export async function postCities(req, res) {
    const { name } = req.body;

  try {
    const existCity = await findRepeatedCityDB(name);
    if (existCity.rowCount > 0) {
      return res.status(409).send("Esta cidade já existe!");
    }

    await postCityDB(name)
    res.status(201).send("Cidade Cadastrada");
    
  } catch (error) {
    console.log('Erro em postCities', error);
    return res.status(500).send(error);
  }
  }
