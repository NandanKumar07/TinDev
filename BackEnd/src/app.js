const express = require("express");
const DBconnect = require("./config/database");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 7777;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();
app.use(express.json());

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Routes
const authRouter = require('./routes/auth');
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// DB and Server Start
DBconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("*** Database connection failed ***", err);
  });
