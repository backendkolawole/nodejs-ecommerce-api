require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//express
const express = require("express");
const app = express();

// database
const connectDB = require("./config/connect");

//middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const authRouter = require("./routes/authRouter");

const PORT = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("", (req, res) => {
  res.send(`e-commerce api`);
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
