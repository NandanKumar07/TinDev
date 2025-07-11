const express = require("express");
const authRouter = express.Router();

const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const cookieParser = require("cookie-parser");

authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of Data
    validateSignUp(req);

    // encrypt the password
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      about,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new Instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
    });

    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials: ");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // only works over HTTPS (which Render uses)
        sameSite: "None", // required for cross-site cookies
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials: ");
    }
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});


authRouter.post("/guest", async (req, res) => {
  try {
    const guestEmail = process.env.GUEST_USER_EMAIL;
    const guestPassword = process.env.GUEST_USER_PASSWORD;

    const user = await User.findOne({ emailId: guestEmail });
    if (!user) return res.status(404).send("Guest user not found");

    const isPasswordValid = await user.validatePassword(guestPassword);

    if (isPasswordValid) {
      // Creating a JWT Token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // only works over HTTPS (which Render uses)
        sameSite: "None", // required for cross-site cookies
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials: ");
    }
  } catch (err) {
    console.error("Guest login failed", err);
    res.status(500).send("Something went wrong");
  }
});


authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logged out is successful");
});

module.exports = authRouter;
