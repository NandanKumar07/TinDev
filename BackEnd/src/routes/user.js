const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const connectionRequestSchema = require("../models/connectionRequestModel");

const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";;

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await connectionRequestSchema
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    if (!receivedRequests) {
      throw new Error("No pending Requests");
    }

    res.json({ message: "People Interested in you", receivedRequests });
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestSchema.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);


    const data = connectionRequests
  .map((row) => {
    // Check if populated users exist
    if (!row.fromUserId || !row.toUserId) {
      return null; // Skip invalid entries
    }
    return row.fromUserId._id.toString() === loggedInUser._id.toString()
      ? row.toUserId
      : row.fromUserId;
  })
  .filter((user) => user !== null);

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = Math.min(limit, 50);
    const skip = (page - 1) * limit;

    // Step 1: Get connection requests that should hide users
    const connections = await connectionRequestSchema.find({
      $or: [
        { fromUserId: loggedInUserId },                      // user has sent request to someone
        { status: "accepted", toUserId: loggedInUserId },    // someone accepted user
        { status: "accepted", fromUserId: loggedInUserId },  // user accepted someone
      ],
    }).select("fromUserId toUserId");

    // Step 2: Collect IDs to hide
    const hideUsersFromFeed = new Set();
    connections.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    hideUsersFromFeed.add(loggedInUserId.toString());

    // Step 3: Find users NOT in hide list and NOT self
    const usersToShow = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ users: usersToShow });
  } catch (err) {
    console.error("Feed error:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
});


module.exports = userRouter;
