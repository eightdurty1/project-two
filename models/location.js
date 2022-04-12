const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  comments: {
    type: String,
  },
  userName: String,
  userAvatar: String,
});

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  locationAddress: {
    type: String,
  },
  hoursOfOp: {
    type: String,
  },
  wifiPassword: {
    type: String,
  },
  comments: [commentsSchema],
});

module.exports = mongoose.model("Location", locationSchema);
