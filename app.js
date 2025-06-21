import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import "dotenv/config.js";

const app = express();

app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use("/", indexRouter);

const PORT = process.env.HOST || 3000;
app.listen(PORT, () => {
  `Express listening on PORT: ${PORT}`;
});
