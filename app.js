require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

// database
const connectDB = require("./config/connect");

//middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("", (req, res) => {
  res.send(`e-commerce api`);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
