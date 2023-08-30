import { db } from "../database/database.js";

export async function findPassengerDB(passengerId) {
    return db.query(`SELECT * FROM passengers WHERE id=$1`, [passengerId]);
  }

export async function findFlightDB(flightId) {
    return db.query(`SELECT * FROM flights WHERE id=$1`, [flightId]);
  }

export async function postTravelDB(passengerId, flightId) {
    return await db.query(
      `INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2);`,
      [passengerId, flightId]
    );
  }