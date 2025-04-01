const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect(
    "mongodb+srv://onlinestudy641:6eeDOWBA354A320u@cluster0.9kspm.mongodb.net/tindev"
  );
};

module.exports = DBconnect;
