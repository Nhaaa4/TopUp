import express from "express"
import Order from "../models/Order.js"

const router = express.Router()

// Generate QR code for payment
router.post("/generate-qr", async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body

    const order = await Order.findOne({ orderId })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // In a real app, you would call the payment gateway API
    // For ABA Bank, you would use their API endpoint
    // For this example, we'll simulate a response

    let qrCodeUrl

    if (paymentMethod === "aba") {
      // Simulate ABA Bank QR code generation
      // In a real app, you would call the ABA Bank API
      // Example: /api/payment-gateway/v1/payments/generate-qr
      qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ABA:${orderId}:${order.price}`
    } else if (paymentMethod === "aceleda") {
      // Simulate Aceleda Bank QR code generation
      qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ACELEDA:${orderId}:${order.price}`
    } else {
      return res.status(400).json({ message: "Invalid payment method" })
    }

    // Update order with payment details
    order.paymentDetails = {
      method: paymentMethod,
      qrCodeUrl,
      generatedAt: new Date(),
    }

    await order.save()

    res.json({
      qrCode: qrCodeUrl,
      expiresIn: 900, // 15 minutes in seconds
      orderId: order.orderId,
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
