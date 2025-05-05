import mongoose from "mongoose"

const supportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
    response: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

const Support = mongoose.model("Support", supportSchema)

export default Support
