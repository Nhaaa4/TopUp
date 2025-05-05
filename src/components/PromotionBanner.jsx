"use client"

import { useState, useEffect } from "react"
import { FaGift, FaTimes, FaArrowRight } from "react-icons/fa"
import TopUpFlow from "./TopUpFlow"
import { useGameContext } from "../context/GameContext"
import "./PromotionBanner.css"

const PromotionBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [currentPromo, setCurrentPromo] = useState(0)
  const { isTopUpInProgress } = useGameContext()

  // Array of promotions to cycle through
  const promotions = [
    {
      text: "Special Offer! Get 20% extra diamonds on Mobile Legends top-ups this weekend!",
      gameId: "mobile-legends",
    },
    {
      text: "Limited Time! 15% bonus UC on all PUBG Mobile packages!",
      gameId: "pubg-mobile",
    },
    {
      text: "New Users: Get 10% off your first Call of Duty Mobile CP purchase!",
      gameId: "call-of-duty-mobile",
    },
  ]

  // Auto-rotate promotions every 5 seconds
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, promotions.length])

  const closeBanner = () => {
    setIsVisible(false)
  }

  const openTopUpModal = () => {
    // Prevent opening multiple top-up flows
    if (isTopUpInProgress) {
      console.log("Top-up already in progress, ignoring request")
      return
    }

    setIsTopUpModalOpen(true)
  }

  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false)
  }

  if (!isVisible) return null

  return (
    <div className="promotion-banner">
      <div className="promotion-content">
        <div className="promotion-icon-wrapper">
          <FaGift className="promotion-icon" />
        </div>
        <div className="promotion-text">
          <p>
            <strong>
              {currentPromo === 0 ? "Special Offer!" : currentPromo === 1 ? "Limited Time!" : "New Users:"}
            </strong>{" "}
            {promotions[currentPromo].text}
          </p>
        </div>
        <button className="promotion-button" onClick={openTopUpModal}>
          <span>Claim Now</span> <FaArrowRight className="button-arrow" />
        </button>
        <button className="close-button" onClick={closeBanner} aria-label="Close promotion">
          <FaTimes />
        </button>
      </div>

      <div className="promotion-indicator">
        {promotions.map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${index === currentPromo ? "active" : ""}`}
            onClick={() => setCurrentPromo(index)}
          />
        ))}
      </div>

      {/* TopUp Flow Modal */}
      <TopUpFlow
        isOpen={isTopUpModalOpen}
        onClose={closeTopUpModal}
        gameId={promotions[currentPromo].gameId}
        initialStep="package"
      />
    </div>
  )
}

export default PromotionBanner
