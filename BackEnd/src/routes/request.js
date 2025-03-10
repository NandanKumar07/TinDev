const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequestSchema = require("../models/connectionRequestModel");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // if the toUserId is present in our user schema
      const isToUserIdPresent = await User.findById(toUserId);
      if (!isToUserIdPresent) {
        throw new Error("Request to the Invalid User");
      }

      // fromUserId and toUserId should not be duplicated -  meaning fromUserId cant be send another time request if request has already sent
      const isRequestAlreadyPresent = await connectionRequestSchema.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (isRequestAlreadyPresent) {
        throw new Error("This Request Already Present");
      }

      // status should be type of interested or ignored
      const isStatusTypeAllowed = ["interested", "ignored"].includes(status);
      if (!isStatusTypeAllowed) {
        throw new Error("Status Type Not Allowed");
      }

      // toUserId cant be same as fromUserId - we can do this by the help of pre function in mongoose inside the ConnectionRequestModel.js file

      const connectionRequest = new connectionRequestSchema({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.send("Connection Request Sent Successfully");
    } catch (err) {
      res.status(404).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // status includes only "accepted" or rejected
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const isAllowedStatus = ["accepted", "rejected"].includes(status);
      if (!isAllowedStatus) {
        throw new Error("Status not allowed");
      }

      // findOne : _id : requestId, toUserID gotta be loggedInUserId, status gotta be "accepted"
      const connectionRequest = await connectionRequestSchema.findOne({
        $and: [
          { _id: requestId },
          { toUserId: loggedInUser._id },
          { status: "interested" },
        ],
      });


      if (!connectionRequest) {
        throw new Error("Connection Request Not Present");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection Request " + status, data });
    } catch (err) {
      res.status(404).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
