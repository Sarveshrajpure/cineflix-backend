const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "content",
      required: true,
    },
  },

  { timestamps: true }
);

const Season = mongoose.model("Season", seasonSchema);

module.exports = { Season };
