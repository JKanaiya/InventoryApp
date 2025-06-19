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
    name: req.body.title,
    categories: req.body.categories,
    price: req.body.price,
    author: req.body.author,
    published: req.body.published,
  });
  res.redirect("/");
};

const addCategory = async function (req, res) {
  // TODO: add conditional to inform user of successful or ! addition?
  await db.addCategory({
    name: req.body.name,
  });
  res.redirect("/");
};

const deleteBook = async function (req, res) {
  await db.deleteBook(req.params.name);
  res.redirect("/");
};

const deleteCategory = async function (req, res) {
  await db.deleteCategory(req.params.title);
  res.redirect("/");
};

const editCategory = async function (req, res) {
  console.log(req.body.previous);
  await db.editCategory({
    name: req.body.previous,
    new: req.body.name,
  });
  res.redirect("/");
};

const getEditBook = async function (req, res) {
  const book = await db.searchBooks(req.params.book);
  const categories = await db.getAllCategories();
  res.render("edit", {
    title: `Edit ${book[0].name}`,
    book: book[0],
    published: book[0].published.toLocaleDateString("en-CA"),
    mode: "book",
    categories: categories,
  });
};

const getEditCategory = async function (req, res) {
  const category = await db.searchCategory(req.params.category);
  res.render("edit", {
    title: `Edit ${category[0].name}`,
    category: category[0],
    mode: "category",
  });
};

const editBook = async function (req, res) {
  await db.editBook({
    newName: req.body.title,
    price: req.body.price,
    author: req.body.author,
    published: req.body.published,
    name: req.body.previous,
    bla: req.body,
  });
  res.redirect("/");
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
