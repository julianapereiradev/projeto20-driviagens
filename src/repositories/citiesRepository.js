import { db } from "../database/database.js"

async function findRepeatedCityDB(name) {
  return db.query(`SELECT * FROM cities WHERE name=$1`, [name]);
}

 async function postCityDB(name) {
  return await db.query(
    `INSERT INTO cities ("name") VALUES ($1);`,
    [name]
  );
}

export {
  findRepeatedCityDB,
  postCityDB
}