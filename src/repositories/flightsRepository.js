import { db } from "../database/database.js";

export async function findCityDB(id) {
    return db.query(`SELECT * FROM cities WHERE id=$1`, [id]);
  }
  