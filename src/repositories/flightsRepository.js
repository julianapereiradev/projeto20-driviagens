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
  