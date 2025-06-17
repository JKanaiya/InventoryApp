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
  getEditCategory,
  getEditBook,
} from "../controllers/indexController.js";

const indexRouter = express.Router();

indexRouter.get("/", getAllData);
indexRouter.get("/:category", getFilteredData);
indexRouter.get("/new/:category", getNewCategory);
indexRouter.get("/new/:book", getNewBook);
indexRouter.get("/edit/book/:book", getEditBook);
indexRouter.get("/edit/category/:category", getEditCategory);
indexRouter.post("/new/category", addCategory);
indexRouter.post("/new/book", addNewBook);
indexRouter.post("/edit/:book", editBook);
indexRouter.post("/edit/:category", editCategory);

export default indexRouter;
