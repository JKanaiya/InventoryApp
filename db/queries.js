import * as db from "../db/index.js";

const getAllBooks = async function () {
  const { rows } = await db.query("SELECT * FROM books");
  return rows;
};

const getAllCategories = async function () {
  const { rows } = await db.query("SELECT * FROM categories");
  return rows;
};

const filterByCategory = async function (category) {
  const { rows } = await db.query(
    "SELECT * FROM books WHERE $1 = ANY(categories)",
    [category],
  );
  return rows;
};

const deleteBook = async function (name) {
  const filter = `%${name}%`;
  const { rows } = await db.query("DELETE FROM books WHERE name LIKE $1", [
    filter,
  ]);
  return rows;
};

const deleteCategory = async function (name) {
  const filter = `%${name}%`;
  const { rows } = await db.query("DELETE FROM categories WHERE name LIKE $1", [
    filter,
  ]);
  return rows;
};

const editCategory = async function (category) {
  const filter = `%${category.name}%`;
  await db.query("UPDATE categories SET name = $1 WHERE name LIKE $2", [
    category.new,
    filter,
  ]);
};

const editBook = async function (book) {
  const bArr = Object.entries(book.bla);
  const categories = [];
  bArr.forEach((cat) => {
    if (cat[1] == "on") categories.push(cat[0]);
  });
  const filter = `%${book.name}%`;
  await db.query(
    "UPDATE books SET name = $1, categories = $2, price = $3, author = $4, published = $5 WHERE name LIKE $6",
    [book.newName, categories, book.price, book.author, book.published, filter],
  );
};

const searchBooks = async function (book) {
  const filter = `%${book}%`;
  const { rows } = await db.query("SELECT * FROM books WHERE name LIKE $1", [
    filter,
  ]);
  return rows;
};

const searchCategory = async function (category) {
  const filter = `%${category}%`;
  const { rows } = await db.query(
    "SELECT * FROM categories WHERE name LIKE $1",
    [filter],
  );
  return rows;
};

const addBook = async function (book) {
  const found = await searchBook(book);
  if (Object.entries(found).length < 1) {
    await db.query(
      "INSERT INTO books (name, categories, price, author, published) VALUES ($1, $2, $3, $4, $5)",
      [book.name, book.categories, book.price, book.author, book.published],
    );
  } else {
    return false;
  }
};

const addCategory = async function (category) {
  const found = await searchCategory(category);
  if (Object.entries(found).length < 1) {
    await db.query("INSERT INTO categories (name) VALUES ($1)", [
      category.name,
    ]);
  } else {
    return false;
  }
};

export {
  addCategory,
  addBook,
  getAllBooks,
  getAllCategories,
  editBook,
  editCategory,
  filterByCategory,
  deleteCategory,
  deleteBook,
  searchCategory,
  searchBooks,
};
