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

export async function getFlightsDB(originCity, destinationCity, smallerDate, biggerDate) {
  let query = `SELECT
    flight.id,
    city1.name AS origin,
    city2.name AS destination,
    TO_CHAR(flight.date, 'DD-MM-YYYY') AS date
  FROM
    flights AS flight
  JOIN
    cities AS city1 ON flight.origin = city1.id
  JOIN
    cities AS city2 ON flight.destination = city2.id`;

  const queryParams = [];

  if (originCity) {
    query += ` WHERE city1.name = $1`;
    queryParams.push(originCity);
  }

  if (destinationCity) {
    query += originCity ? ` AND city2.name = $${queryParams.length + 1}` : ` WHERE city2.name = $1`;
    queryParams.push(destinationCity);
  }

  if (smallerDate && biggerDate) {
    query += ` AND flight.date >= $${queryParams.length + 1} AND flight.date <= $${queryParams.length + 2}`;
    queryParams.push(smallerDate, biggerDate);
  }

  query += ` ORDER BY flight.date;`;

  return await db.query(query, queryParams);
}