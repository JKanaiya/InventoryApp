import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import "dotenv/config.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
console.log(process.env.CONNECTION_STRING);
app.set("view engine", "ejs");
app.use("/", indexRouter);

const PORT = process.env.HOST || 3000;
app.listen(PORT, () => {
  `Express listening on PORT: ${PORT}`;
});
