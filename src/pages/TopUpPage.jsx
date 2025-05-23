"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaInfoCircle, FaCoins } from "react-icons/fa"
import { getGamePackages } from "../services/api"
import { useGameContext } from "../context/GameContext"
import "./TopUpPage.css"

const TopUpPage = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { setSelectedGame, setSelectedPackage } = useGameContext()

  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gameInfo, setGameInfo] = useState(null)

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch game packages from API
        const packagesData = await getGamePackages(gameId)

        if (packagesData.gameInfo && packagesData.packages && packagesData.packages.length > 0) {
          setPackages(packagesData.packages)
          setGameInfo(packagesData.gameInfo)
          setSelectedGame({
            id: gameId,
            name: packagesData.gameInfo.name,
          })
        } else {
          console.log("Using fallback data for game:", gameId)
          // Use fallback data if API fails or returns empty data
          const fallbackData = getFallbackPackages(gameId)
          setPackages(fallbackData.packages)
          setGameInfo(fallbackData.gameInfo)
          setSelectedGame({
            id: gameId,
            name: fallbackData.gameInfo.name,
          })
        }
      } catch (err) {
        console.error("Error in TopUpPage:", err)
        setError("Failed to load game packages. Using default packages instead.")

        // Use fallback data if API fails
        const fallbackData = getFallbackPackages(gameId)
        setPackages(fallbackData.packages)
        setGameInfo(fallbackData.gameInfo)
        setSelectedGame({
          id: gameId,
          name: fallbackData.gameInfo.name,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGameData()
  }, [gameId, setSelectedGame])

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    navigate("/verify")
  }

  // Fallback data in case API fails
  const getFallbackGameInfo = (id) => {
    const games = {
      "mobile-legends": {
        name: "Mobile Legends",
        currency: "Diamonds",
        image: "/images/mobile-legends.jpg",
        description:
          "Mobile Legends: Bang Bang is a mobile multiplayer online battle arena (MOBA) game developed and published by Moonton.",
      },
      "free-fire": {
        name: "Free Fire",
        currency: "Diamonds",
        image: "/images/free-fire.jpg",
        description:
          "Garena Free Fire is a battle royale game, developed by 111 Dots Studio and published by Garena for Android and iOS.",
      },
      "clash-of-clans": {
        name: "Clash of Clans",
        currency: "Gems",
        image: "/images/clash-of-clans.jpg",
        description:
          "Clash of Clans is a free-to-play mobile strategy video game developed and published by Finnish game developer Supercell.",
      },
      "magic-chess": {
        name: "Magic Chess",
        currency: "Diamonds",
        image: "/images/magic-chess.jpg",
        description:
          "Magic Chess is an auto-battler game mode in Mobile Legends: Bang Bang where players compete against seven other players.",
      },
      "league-of-legends": {
        name: "League of Legends",
        currency: "Riot Points",
        image: "/images/league-of-legends.jpg",
        description: "League of Legends is a team-based strategy game developed and published by Riot Games.",
      },
    }

    return (
      games[id] || {
        name: "Unknown Game",
        currency: "Credits",
        image: "/images/placeholder.jpg",
        description: "Game information not available.",
      }
    )
  }

  const getFallbackPackages = (id) => {
    const gameInfo = getFallbackGameInfo(id)

    let packages = []

    if (id === "mobile-legends" || id === "free-fire" || id === "magic-chess") {
      packages = [
        { id: 1, name: "50 Diamonds", amount: 50, price: 2.5, currency: "Diamonds" },
        { id: 2, name: "100 Diamonds", amount: 100, price: 5, currency: "Diamonds" },
        { id: 3, name: "310 Diamonds", amount: 310, price: 10, currency: "Diamonds" },
        { id: 4, name: "520 Diamonds", amount: 520, price: 15, currency: "Diamonds" },
        { id: 5, name: "1060 Diamonds", amount: 1060, price: 30, currency: "Diamonds" },
        { id: 6, name: "2180 Diamonds", amount: 2180, price: 60, currency: "Diamonds" },
      ]
    } else if (id === "clash-of-clans") {
      packages = [
        { id: 1, name: "80 Gems", amount: 80, price: 1, currency: "Gems" },
        { id: 2, name: "500 Gems", amount: 500, price: 5, currency: "Gems" },
        { id: 3, name: "1200 Gems", amount: 1200, price: 10, currency: "Gems" },
        { id: 4, name: "2500 Gems", amount: 2500, price: 20, currency: "Gems" },
        { id: 5, name: "6500 Gems", amount: 6500, price: 50, currency: "Gems" },
        { id: 6, name: "14000 Gems", amount: 14000, price: 100, currency: "Gems" },
      ]
    } else if (id === "league-of-legends") {
      packages = [
        { id: 1, name: "650 RP", amount: 650, price: 5, currency: "Riot Points" },
        { id: 2, name: "1380 RP", amount: 1380, price: 10, currency: "Riot Points" },
        { id: 3, name: "2800 RP", amount: 2800, price: 20, currency: "Riot Points" },
        { id: 4, name: "5600 RP", amount: 5600, price: 40, currency: "Riot Points" },
        { id: 5, name: "11000 RP", amount: 11000, price: 75, currency: "Riot Points" },
      ]
    } else {
      packages = [
        { id: 1, name: "Small Package", amount: 100, price: 5, currency: "Credits" },
        { id: 2, name: "Medium Package", amount: 300, price: 10, currency: "Credits" },
        { id: 3, name: "Large Package", amount: 500, price: 15, currency: "Credits" },
        { id: 4, name: "Premium Package", amount: 1000, price: 30, currency: "Credits" },
      ]
    }

    return { gameInfo, packages }
  }

  return (
    <div className="top-up-page">
      {loading ? (
        <div className="loading">Loading game packages...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* Game Info Section */}
          <section className="game-info-section">
            <div className="game-info-container">
              <div className="game-image">
                <img src={gameInfo.image || `/images/${gameId}.jpg`} alt={gameInfo.name} />
              </div>
              <div className="game-details">
                <h1>{gameInfo.name}</h1>
                <p>{gameInfo.description}</p>
                <div className="info-box">
                  <FaInfoCircle className="info-icon" />
                  <p>
                    Select a package below to top up your {gameInfo.name} account. You'll need to verify your game ID in
                    the next step.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section className="packages-section">
            <h2>Select Package</h2>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card" onClick={() => handlePackageSelect(pkg)}>
                  <div className="package-icon">
                    <FaCoins />
                  </div>
                  <h3>{pkg.name}</h3>
                  <div className="package-price">${pkg.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions Section */}
          <section className="instructions-section">
            <h2>How to Top Up</h2>
            <div className="instructions-container">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <p>Select your desired package from the options above</p>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <p>Enter your game ID and server information for verification</p>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <p>Complete the payment using your preferred method</p>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <p>Receive your game credits instantly after payment confirmation</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default TopUpPage
