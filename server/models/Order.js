import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    packageId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    serverId: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: {
      type: String,
      default: "",
    },
    paymentDetails: {
      type: Object,
      default: {},
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model("Order", orderSchema)

export default Order
