const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  categories VARCHAR(255),
  author VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  published TIMESTAMP
);
CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(255) PRIMARY KEY,
  amount INTEGER   
);
`;
async function main() {
  console.log("seeding...");
  console.log(process.env.CONNECTION_STRING);
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
