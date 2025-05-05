"use client"

import { useState, useEffect } from "react"
import { FaGamepad } from "react-icons/fa"
import { useGameContext } from "../../context/GameContext"
import Modal from "../Modal"
import "./GameSelectionModal.css"

const GameSelectionModal = ({ isOpen, onClose, onNext }) => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { setSelectedGame } = useGameContext()

  useEffect(() => {
    const fetchGames = async () => {
        setError("Failed to load games. Using default game list instead.")
        setGames(fallbackGames)
        setLoading(false)
    }

    if (isOpen) {
      fetchGames()
    }
  }, [isOpen])

  // Fallback data in case API fails
  const fallbackGames = [
    { id: "mobile-legends", name: "Mobile Legends", image: "/images/mobile-legends.jpg" },
    { id: "pubg-mobile", name: "PUBG Mobile", image: "/images/pubg-mobile.jpg" },
    { id: "call-of-duty-mobile", name: "Call of Duty Mobile", image: "/images/call-of-duty-mobile.jpg" },
    { id: "free-fire", name: "Free Fire", image: "/images/free-fire.jpg" },
    { id: "clash-of-clans", name: "Clash of Clans", image: "/images/clash-of-clans.jpg" },
    { id: "magic-chess", name: "Magic Chess", image: "/images/magic-chess.jpg" },
    { id: "league-of-legends", name: "League of Legends", image: "/images/league-of-legends.jpg" },
  ]

  const handleGameSelect = (game) => {
    setSelectedGame({
      id: game.id,
      name: game.name,
    })
    // Immediately proceed to the next step
    onNext()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Game" size="large">
      {loading ? (
        <div className="modal-loading">Loading games...</div>
      ) : error ? (
        <div className="modal-error">{error}</div>
      ) : (
        <div className="game-selection-grid">
          {games.map((game) => (
            <div key={game.id} className="game-selection-card" onClick={() => handleGameSelect(game)}>
              <div className="game-selection-image">
                <img src={game.image || `/images/${game.id}.jpg`} alt={game.name} />
              </div>
              <div className="game-selection-name">
                <FaGamepad className="game-icon" />
                <h3>{game.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

export default GameSelectionModal
