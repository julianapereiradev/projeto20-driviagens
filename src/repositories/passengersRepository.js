import { db } from "../database/database.js";

export async function postPassengerDB(firstName, lastName) {
  return await db.query(
    `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2);`,
    [firstName, lastName]
  );
}

export async function getPassengersTravelQtyDB(limit, offset, nameFilter) {
  const query = `
    SELECT
      CONCAT("firstName", ' ', "lastName") AS passenger,
      COUNT("passengerId") AS travels
    FROM
      passengers
    JOIN
      travels ON passengers.id = travels."passengerId"
    WHERE
      CONCAT("firstName", ' ', "lastName") ILIKE '%' || $1 || '%'
    GROUP BY
      passenger
    ORDER BY
      travels DESC
    LIMIT $2
    OFFSET $3;
  `;

  return await db.query(query, [nameFilter, limit, offset]);
}
