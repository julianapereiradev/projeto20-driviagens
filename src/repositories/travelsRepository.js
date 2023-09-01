import { db } from "../database/database.js";

 async function findPassengerDB(passengerId) {
    return db.query(`SELECT * FROM passengers WHERE id=$1`, [passengerId]);
  }

 async function findFlightDB(flightId) {
    return db.query(`SELECT * FROM flights WHERE id=$1`, [flightId]);
  }

 async function postTravelDB(passengerId, flightId) {
    return await db.query(
      `INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2);`,
      [passengerId, flightId]
    );
  }


  export {
    findPassengerDB,
    findFlightDB,
    postTravelDB
  }