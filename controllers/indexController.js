import { log } from "node:console";
import * as db from "../db/queries.js";

const getAllData = async function (req, res) {
  const books = await db.getAllBooks();
  const categories = await db.getAllCategories();
  res.render("index", {
    books: books,
    categories: categories,
  });
};

const getFilteredData = async function (req, res) {
  const books = await db.filterByCategory(req.params.filter);
  const categories = await db.getAllCategories();
  res.render("index", {
    books: books,
    categories: categories,
  });
};

const getNewBook = async function (req, res) {
  res.render("new", {
    title: "New Book",
  });
};
const getNewCategory = async function (req, res) {
  res.render("new", {
    title: "New Category",
  });
};
// [book.name, book.categories, book.price, book.author, book.published],
const addNewBook = async function (req, res) {
  // TODO: add conditional to inform user of successful or ! addition?
  await db.addBook({
    name: req.query.name,
    categories: req.query.categories,
    price: req.query.price,
    author: req.query.author,
    published: req.query.published,
  });
  res.redirect("/");
};

const addCategory = async function (req, res) {
  // TODO: add conditional to inform user of successful or ! addition?
  await db.addCategory({
    name: req.query.name,
  });
  res.redirect("/");
};

const deleteBook = async function (req, res) {
  await db.deleteBook(req.params.name);
  res.redirect("/");
};

const deleteCategory = async function (req, res) {
  await db.deleteCategory(req.params.name);
  res.redirect("/");
};

const editCategory = async function (req, res) {
  await db.editCategory(req.query.name);
  res.redirect("/");
};

const getEditBook = async function (req, res) {
  const book = await db.searchBooks(req.params.book);
  res.render("edit", {
    title: `Edit ${book[0].name}`,
    book: book[0],
    mode: "book",
  });
};

const getEditCategory = async function (req, res) {
  const category = await db.searchCategory(req.params.category);
  res.render("edit", {
    title: `Edit ${category[0].name}`,
    category: category,
    mode: "category",
  });
};

const editBook = async function (req, res) {
  await db.editBook({
    newName: req.query.name,
    categories: req.query.categories,
    price: req.query.price,
    author: req.query.author,
    published: req.query.published,
    name: req.params.name,
  });
};

export {
  getAllData,
  getFilteredData,
  addNewBook,
  addCategory,
  deleteBook,
  deleteCategory,
  editCategory,
  editBook,
  getNewBook,
  getNewCategory,
  getEditCategory,
  getEditBook,
};
