const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      required: true,
    },
    watchHistory: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
