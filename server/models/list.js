const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

listSchema.statics.titleTaken = async function (title) {
  const list = await this.findOne({ title });

  return !!list;
};

const List = mongoose.model("List", listSchema);

module.exports = { List };
