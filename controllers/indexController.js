import * as db from "../db/queries.js";
import { body, validationResult } from "express-validator";

const bookLen = "Book must be at least 1 or max 20 characters";
const authorLen = "Author name must be at least 1 or max 20 characters";

const validateBook = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Book Length: ${bookLen}`),
  body("author")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Author: ${authorLen}`),
  body("price").trim().isNumeric().withMessage(`Price must be a number`),
  body("published").trim().isDate().withMessage(`Published date is required`),
];

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(
      `Category Length: Category Must be at least 1 or 20 max characters`,
    )
    .custom(async (val) => {
      const a = await db.searchCategory(val);
      if (Object.entries(a).length != 0) {
        throw new Error("Category already in use");
      }
    }),
];

const getAllData = async function (req, res) {
  const books = await db.getAllBooks();
  const categories = await db.getAllCategories();
  res.render("index", {
    books: books,
    categories: categories,
  });
};

const getFilteredData = async function (req, res) {
  const books = await db.filterByCategory(req.params.category);
  const categories = await db.getAllCategories();
  res.render("index", {
    books: books,
    categories: categories,
  });
};

const getNewBook = async function (req, res) {
  const categories = await db.getAllCategories();
  res.render("new", {
    title: "New Book",
    categories: categories,
  });
};

const getNewCategory = async function (req, res) {
  res.render("new", {
    title: "New Category",
  });
};
// [book.name, book.categories, book.price, book.author, book.published],
const addNewBook = [
  validateBook,
  async (req, res) => {
    const categories = await db.getAllCategories();
    // TODO: add conditional to inform user of successful or ! addition?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "New Book",
        categories: categories,
        errors: errors.array(),
      });
    }
    await db.addBook({
      name: req.body.title,
      categories: req.body.categories,
      price: req.body.price,
      author: req.body.author,
      published: req.body.published,
    });
    res.redirect("/");
  },
];

const addCategory = [
  validateCategory,
  async (req, res) => {
    // TODO: add conditional to inform user of successful or ! addition?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "New category",
        errors: errors.array(),
      });
    }
    await db.addCategory({
      name: req.body.name,
    });
    res.redirect("/");
  },
];

const deleteBook = async function (req, res) {
  await db.deleteBook(req.params.book);
  res.redirect("/");
};

const deleteCategory = async function (req, res) {
  await db.deleteCategory(req.params.category);
  res.redirect("/");
};

const editCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("edit", {
        title: "Edit category",
        category: req.body.name,
        mode: "category",
        errors: errors.array(),
      });
    }
    await db.editCategory({
      name: req.body.previous,
      new: req.body.name,
    });
    res.redirect("/");
  },
];

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

const editBook = [
  validateBook,
  async (req, res) => {
    const errors = validationResult(req);
    const book = await db.searchBooks(req.body.previous);
    const categories = await db.getAllCategories();
    if (!errors.isEmpty()) {
      return res.status(400).render(`edit`, {
        title: `Edit ${book[0].name}`,
        book: book[0],
        published: book[0].published.toLocaleDateString("en-CA"),
        categories: categories,
        mode: "book",
        errors: errors.array(),
      });
    }
    await db.editBook({
      newName: req.body.title,
      price: req.body.price,
      author: req.body.author,
      categories: req.body.categories,
      published: req.body.published,
      name: req.body.previous,
      bla: req.body,
    });
    res.redirect("/");
  },
];

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
