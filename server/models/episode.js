const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    video: { type: String },
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "season",
      required: true,
    },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = { Episode };
