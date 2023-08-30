import {db} from "../database/database.js"

export async function signup(req, res) {
  const teste = await db.query(`SELECT * FROM cities`)
  res.send(teste.rows)
  }
  
  export async function signin(req, res) {
    //
  }