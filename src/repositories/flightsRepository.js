import { db } from "../database/database.js";

export async function findCityDB(originOrDestination) {
  return db.query(`SELECT * FROM cities WHERE id=$1`, [originOrDestination]);
}

export async function postFlightDB(origin, destination, date) {
  return await db.query(
    `INSERT INTO flights ("origin", "destination", "date") VALUES ($1, $2, $3);`,
    [origin, destination, date]
  );
}

export async function getFlightsDB(originCity, destinationCity) {
  let query = `SELECT
    flight.id,
    city1.name AS origin,
    city2.name AS destination,
    flight.date
  FROM
    flights AS flight
  JOIN
    cities AS city1 ON flight.origin = city1.id
  JOIN
    cities AS city2 ON flight.destination = city2.id`;

  if (originCity) {
    query += ` WHERE city1.name = $1`;
  }

  if (destinationCity) {
    query += originCity ? ` AND city2.name = $2` : ` WHERE city2.name = $1`;
  }

  query += ` ORDER BY flight.date;`;

  if (originCity && destinationCity) {
    return await db.query(query, [originCity, destinationCity]); // Passar os valores das cidades como parâmetros
  } else if (originCity || destinationCity) {
    return await db.query(query, [originCity || destinationCity]);
  } else {
    return await db.query(query);
  }
}
