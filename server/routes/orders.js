import express from "express"
import Order from "../models/Order.js"
import { generateOrderId } from "../utils/helpers.js"

const router = express.Router()

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { gameId, packageId, userId, serverId, amount, price, paymentMethod } = req.body

    // Generate a unique order ID
    const orderId = generateOrderId()

    const newOrder = new Order({
      orderId,
      gameId,
      packageId,
      userId,
      serverId,
      amount,
      price,
      paymentMethod,
      status: "pending",
    })

    await newOrder.save()

    res.status(201).json({
      orderId: newOrder.orderId,
      status: newOrder.status,
      createdAt: newOrder.createdAt,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get order by ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Confirm payment for an order
router.post("/:orderId/confirm", async (req, res) => {
  try {
    const { transactionId } = req.body

    const order = await Order.findOne({ orderId: req.params.orderId })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order is not in pending status" })
    }

    // Update order status
    order.status = "completed"
    order.transactionId = transactionId
    order.completedAt = new Date()

    await order.save()

    res.json({
      message: "Payment confirmed successfully",
      status: order.status,
      transactionId: order.transactionId,
    })
  } catch (error) {
    console.error("Error confirming payment:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
