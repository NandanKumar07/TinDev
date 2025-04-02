const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the tokem from the req cookies
    const { token } = req.cookies;
    if(!token) {
      return res.status(401).send("Please Login!")
    }
    // validate the token
    const decodedObj = await jwt.verify(token, "TINDEV@DEVTIN");

    // Find the User
    const user = await User.findById(decodedObj._id);
    if(!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
};

module.exports = { userAuth };
