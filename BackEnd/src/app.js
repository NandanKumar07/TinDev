const express = require("express");
const DBconnect = require("./config/database");
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


const authRouter = require('./routes/auth');
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter= require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


DBconnect()
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.error("***Database cannot be connected***");
  });
