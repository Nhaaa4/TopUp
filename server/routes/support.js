import express from "express"
import Support from "../models/Support.js"

const router = express.Router()

// Submit a support request
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const newSupport = new Support({
      name,
      email,
      subject,
      message,
    })

    await newSupport.save()

    res.status(201).json({
      message: "Support request submitted successfully",
      supportId: newSupport._id,
    })
  } catch (error) {
    console.error("Error submitting support request:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
