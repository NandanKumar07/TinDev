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

    // console.log(connectionRequests);

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
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1)*limit;

    const connectionRequest = await connectionRequestSchema
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId")

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId);
      hideUsersFromFeed.add(req.toUserId);
    })

    const user = await User.find({
      $and : [
        {_id: {$nin: Array.from(hideUsersFromFeed)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
