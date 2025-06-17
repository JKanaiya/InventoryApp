import { Client } from "pg";
import "dotenv/config.js";

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  categories VARCHAR(255),
  author VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  published DATE
);
CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(255) PRIMARY KEY,
  amount INTEGER   
);
INSERT INTO books (name, categories, price, author, published) VALUES ('Way of Kings', 'Fantasy', 35.00, 'Brandon Sanderson', '2010-08-31');
INSERT INTO categories (name, amount) VALUES ('Fantasy', 5);
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
