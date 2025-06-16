const { Router } = require("express");
const {
  getAllData,
  addCategory,
  addNewBook,
  editCategory,
  editBook,
  getFilteredData,
  getNewCategory,
  getNewBook,
} = require("../controllers/indexController");
const { addBook } = require("../db/queries");
const indexRouter = Router();

indexRouter.get("/", getAllData);
indexRouter.get("/:category", getFilteredData);
indexRouter.get("/new/category", getNewCategory);
indexRouter.get("/new/book", getNewBook);
indexRouter.get("/edit/book", editBook);
indexRouter.post("/new/category", addCategory);
indexRouter.post("/new/book", addNewBook);
indexRouter.post("/edit/:book", editBook);
indexRouter.post("/edit/:category", editCategory);

module.exports = indexRouter;
