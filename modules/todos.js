const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
      trim: true,
    },
    state: {
      type: String,
      enum: ["done", "in_progress", "uncompleted"],
      default: "uncompleted",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Todo", todoSchema);
