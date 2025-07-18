const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { indexRouter } = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", indexRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
