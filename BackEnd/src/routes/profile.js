const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { editDataIsValid } = require("../utils/validation");
const { isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!editDataIsValid) {
      throw new Error("INVALID EDIT REQUEST");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send({
      message: `${loggedInUser.firstName} your profile edit was successful`,
      Data: loggedInUser,
    });
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const password = req.body.password.toString();
    if (!password || !isStrongPassword(password)) {
      throw new Error("Not a strong password");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const loggedInUser = req.user;

    loggedInUser.password = passwordHash;

    await loggedInUser.save();

    res.send(`Your Password is now ${passwordHash}`);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
