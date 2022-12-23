const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    duration: { type: String },
    genre: { type: String },
    type: { type: String, default: "movie" },
  },
  { timestamps: true }
);

contentSchema.statics.titleTaken = async function (title) {
  const content = await this.findOne({ title });

  return !!content;
};

const Content = mongoose.model("Content", contentSchema);

module.exports = { Content };
