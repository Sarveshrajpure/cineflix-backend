const mongoose = require("mongoose");

const watchHistoryObjectSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  },
  watchTime: { type: Number, maxLength: 10 },
  contentType: {
    type: String,
  },
});

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      required: true,
    },
    watchHistory: [watchHistoryObjectSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    favourites: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
