import { db } from "../database/database.js";

export async function postPassengerDB(firstName, lastName) {
  return await db.query(
    `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2);`,
    [firstName, lastName]
  );
}
