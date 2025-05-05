"use client"

import { useState } from "react"
import { FaGamepad, FaArrowRight } from "react-icons/fa"
import { useGameContext } from "../context/GameContext"
import TopUpFlow from "./TopUpFlow"
import "./QuickTopUpWidget.css"

const QuickTopUpWidget = () => {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState(null)
  const { setSelectedGame } = useGameContext()

  // Popular games for quick access
  const popularGames = [
    { id: "mobile-legends", name: "Mobile Legends", icon: "🎮" },
    { id: "pubg-mobile", name: "PUBG Mobile", icon: "🔫" },
    { id: "call-of-duty-mobile", name: "Call of Duty Mobile", icon: "🎯" },
    { id: "free-fire", name: "Free Fire", icon: "🔥" },
  ]

  const openTopUpModal = (gameId = null) => {
    setSelectedGameId(gameId)
    setIsTopUpModalOpen(true)
  }

  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false)
    setSelectedGameId(null)
  }

  return (
    <div className="quick-topup-widget">
      <div className="widget-header">
        <FaGamepad className="widget-icon" />
        <h3>Quick Top-Up</h3>
      </div>

      <div className="widget-content">
        <p>Select a game to top-up instantly:</p>

        <div className="quick-game-buttons">
          {popularGames.map((game) => (
            <button key={game.id} className="quick-game-button" onClick={() => openTopUpModal(game.id)}>
              <span className="game-icon">{game.icon}</span>
              <span className="game-name">{game.name}</span>
            </button>
          ))}
        </div>

        <button className="all-games-button" onClick={() => openTopUpModal()}>
          <span>All Games</span>
          <FaArrowRight />
        </button>
      </div>

      {/* TopUp Flow Modal */}
      <TopUpFlow
        isOpen={isTopUpModalOpen}
        onClose={closeTopUpModal}
        gameId={selectedGameId}
        initialStep={selectedGameId ? "package" : "game"}
      />
    </div>
  )
}

export default QuickTopUpWidget
