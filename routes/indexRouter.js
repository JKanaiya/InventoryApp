import { Router } from "express"
import  {
  getAllData,
  addCategory,
  addNewBook,
  editCategory,
  editBook,
  getFilteredData,
  getNewCategory,
  getNewBook,
} from ("../controllers/indexController");

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

export default indexRouter;
