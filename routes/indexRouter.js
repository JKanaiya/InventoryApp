import express from "express";
import {
  getAllData,
  addCategory,
  addNewBook,
  editCategory,
  editBook,
  getFilteredData,
  getNewCategory,
  getNewBook,
  getEditBook,
  getEditCategory,
  deleteBook,
  deleteCategory,
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", getAllData);
indexRouter.get("/:category", getFilteredData);
indexRouter.get("/new/category", getNewCategory);
indexRouter.get("/new/book", getNewBook);
indexRouter.post("/new/category", addCategory);
indexRouter.post("/new/book", addNewBook);
indexRouter.get("/edit/book/:book", getEditBook);
indexRouter.get("/edit/category/:category", getEditCategory);
indexRouter.post("/edit/book/:book", editBook);
indexRouter.post("/edit/category/:category", editCategory);
indexRouter.get("/delete/book/:book", deleteBook);
indexRouter.get("/delete/category/:category", deleteCategory);

export default indexRouter;
