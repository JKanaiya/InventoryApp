import { Client } from "pg";
import "dotenv/config.js";

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  categories VARCHAR(255) ARRAY,
  author VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  published DATE
);
CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(255) PRIMARY KEY
);
INSERT INTO books (name, categories, price, author, published) 
VALUES
('Way of Kings', '{"Fantasy", "Cosmere"}', 35.00, 'Brandon Sanderson', '2010-08-31'),
('Words of Radiance', '{"Fantasy", "Cosmere"}', 38.00, 'Brandon Sanderson', '2014-03-04'),
('Oathbringer', '{"Fantasy", "Cosmere"}', 40.00, 'Brandon Sanderson', '2017-11-14'),
('Rhythm of War', '{"Fantasy", "Cosmere"}', 42.00, 'Brandon Sanderson', '2020-11-17'),
('Dune', '{"Science Fiction"}', 25.00, 'Frank Herbert', '1965-08-01'),
('The Hobbit', '{"Fantasy", "Classic"}', 20.00, 'J.R.R. Tolkien', '1937-09-21'),
('Project Hail Mary', '{"Science Fiction", "Humor"}', 30.00, 'Andy Weir', '2021-05-04'),
('The Name of the Wind', '{"Fantasy"}', 28.00, 'Patrick Rothfuss', '2007-03-27'),
('Mistborn: The Final Empire', '{"Fantasy", "Cosmere"}', 32.00, 'Brandon Sanderson', '2006-07-17');

INSERT INTO categories (name) VALUES ('Fantasy'), ('Cosmere'), ('Science Fiction'), ('Classic'), ('Humor');
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
