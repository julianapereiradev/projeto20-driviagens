import { db } from "../database/database.js"

export async function findRepeatedCityDB(name) {
  return db.query(`SELECT * FROM cities WHERE name=$1`, [name]);
}

export async function postCityDB(name) {
  return await db.query(
    `INSERT INTO cities ("name") VALUES ($1);`,
    [name]
  );
}