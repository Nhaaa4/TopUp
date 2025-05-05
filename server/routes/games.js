import express from "express"
import Game from "../models/Game.js"

const router = express.Router()

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find({ active: true }).select("id name image")
    res.json(games)
  } catch (error) {
    console.error("Error fetching games:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get game packages by game ID
router.get("/:gameId/packages", async (req, res) => {
  try {
    const game = await Game.findOne({ id: req.params.gameId, active: true })

    if (!game) {
      return res.status(404).json({ message: "Game not found" })
    }

    const gameInfo = {
      name: game.name,
      description: game.description,
      image: game.image,
      currency: game.currency,
      requiresServerId: game.requiresServerId,
    }

    res.json({
      gameInfo,
      packages: game.packages,
    })
  } catch (error) {
    console.error("Error fetching game packages:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
