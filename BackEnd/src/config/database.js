const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect(
    "xyz"
  );
};

module.exports = DBconnect;
