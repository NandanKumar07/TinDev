const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    status : {
        type: String,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    },
}, { timestamps: true });

connectionRequestSchema.pre("save", async function(next) {
    
    if(this.fromUserId.equals(this.toUserId)) {
        throw new Error("You Can't sent the request to yourself");
    }
    
    next();
})

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);

