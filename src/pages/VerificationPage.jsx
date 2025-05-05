"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useGameContext } from "../context/GameContext"
import "./VerificationPage.css"

const VerificationPage = () => {
  const navigate = useNavigate()
  const { selectedGame, selectedPackage, userId, setUserId, serverId, setServerId } = useGameContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userIdError, setUserIdError] = useState("")
  const [serverIdError, setServerIdError] = useState("")

  // Redirect if no game or package is selected
  if (!selectedGame || !selectedPackage) {
    navigate("/")
    return null
  }

  const handleUserIdChange = (e) => {
    setUserId(e.target.value)
    setUserIdError("")
  }

  const handleServerIdChange = (e) => {
    setServerId(e.target.value)
    setServerIdError("")
  }

  const validateForm = () => {
    let isValid = true

    if (!userId.trim()) {
      setUserIdError("Game ID is required")
      isValid = false
    }

    if (needsServerId() && !serverId.trim()) {
      setServerIdError("Server ID is required")
      isValid = false
    }

    return isValid
  }

  const needsServerId = () => {
    // Some games require server ID, others don't
    return ["mobile-legends", "magic-chess"].includes(selectedGame.id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In a real app, you would verify the account with the API
      // For now, we'll simulate a successful verification
      if (selectedGame.id && userId) {
        // Optionally call the API for verification
        // await verifyGameAccount(selectedGame.id, userId, serverId)

        // Navigate to payment page
        navigate("/payment")
      }
    } catch (err) {
      setError("Failed to verify account. Please check your game ID and server ID.")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate(`/topup/${selectedGame.id}`)
  }

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h1>Account Verification</h1>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <span>Game:</span>
              <span>{selectedGame.name}</span>
            </div>
            <div className="summary-item">
              <span>Package:</span>
              <span>{selectedPackage.name}</span>
            </div>
            <div className="summary-item">
              <span>Price:</span>
              <span>${selectedPackage.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <FaExclamationTriangle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-group">
            <label htmlFor="userId">Game ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter your Game ID"
              className={userIdError ? "error" : ""}
            />
            {userIdError && <div className="input-error">{userIdError}</div>}
          </div>

          {needsServerId() && (
            <div className="form-group">
              <label htmlFor="serverId">Server ID</label>
              <input
                type="text"
                id="serverId"
                value={serverId}
                onChange={handleServerIdChange}
                placeholder="Enter your Server ID"
                className={serverIdError ? "error" : ""}
              />
              {serverIdError && <div className="input-error">{serverIdError}</div>}
            </div>
          )}

          <div className="verification-note">
            <FaExclamationTriangle />
            <p>
              Please make sure your Game ID{needsServerId() ? " and Server ID are" : " is"} correct. We will not be
              responsible for top-ups to incorrect accounts.
            </p>
          </div>

          <div className="form-actions">
            <button type="button" className="back-button" onClick={handleBack} disabled={loading}>
              <FaArrowLeft /> Back
            </button>
            <button type="submit" className="continue-button" disabled={loading}>
              {loading ? "Verifying..." : "Continue"} {!loading && <FaArrowRight />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerificationPage
