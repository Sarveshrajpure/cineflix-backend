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

episodeSchema.statics.titleTaken = async function (title) {
  const episode = await Episode.findOne({ title });

  return !!episode;
};

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = { Episode };
