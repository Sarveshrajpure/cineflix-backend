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

seasonSchema.statics.titleTaken = async function (title) {
  const season = await this.findOne({ title });

  return !!season;
};

const Season = mongoose.model("Season", seasonSchema);

module.exports = { Season };
