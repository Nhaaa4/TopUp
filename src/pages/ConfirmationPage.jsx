"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaCheckCircle, FaHome, FaGamepad } from "react-icons/fa"
import { useGameContext } from "../context/GameContext"
import "./ConfirmationPage.css"

const ConfirmationPage = () => {
  const navigate = useNavigate()
  const { orderDetails, resetOrder } = useGameContext()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)

  // Redirect if no order details
  useEffect(() => {
    if (!orderDetails) {
      navigate("/")
      return
    }

    const checkOrderStatus = async () => {
      try {
        // In a real app, you would check the order status from the API
        // For now, we'll simulate a successful order
        setTimeout(() => {
          setOrderStatus({
            status: "completed",
            message: "Your payment has been confirmed and the top-up has been processed successfully.",
            transactionId: "TXN" + Math.floor(Math.random() * 1000000),
          })
          setLoading(false)
        }, 2000)
      } catch (err) {
        setError("Failed to check order status. Please contact support.")
        setLoading(false)
      }
    }

    checkOrderStatus()
  }, [orderDetails, navigate])

  const handleGoHome = () => {
    resetOrder()
    navigate("/")
  }

  const handleNewTopUp = () => {
    resetOrder()
    navigate("/#games")
  }

  if (loading) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container loading-state">
          <div className="loading-spinner"></div>
          <h2>Processing your order...</h2>
          <p>Please wait while we confirm your payment and process your top-up.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container error-state">
          <div className="error-icon">!</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <div className="confirmation-actions">
            <button className="home-button" onClick={handleGoHome}>
              <FaHome /> Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container success-state">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h2>Top-Up Successful!</h2>
        <p>{orderStatus.message}</p>

        <div className="confirmation-details">
          <div className="confirmation-item">
            <span>Order ID:</span>
            <span>{orderDetails.orderId}</span>
          </div>
          <div className="confirmation-item">
            <span>Transaction ID:</span>
            <span>{orderStatus.transactionId}</span>
          </div>
          <div className="confirmation-item">
            <span>Game:</span>
            <span>{orderDetails.gameId}</span>
          </div>
          <div className="confirmation-item">
            <span>Package:</span>
            <span>
              {orderDetails.amount} {orderDetails.currency}
            </span>
          </div>
          <div className="confirmation-item">
            <span>Game ID:</span>
            <span>{orderDetails.userId}</span>
          </div>
          {orderDetails.serverId && (
            <div className="confirmation-item">
              <span>Server ID:</span>
              <span>{orderDetails.serverId}</span>
            </div>
          )}
          <div className="confirmation-item">
            <span>Amount Paid:</span>
            <span>${orderDetails.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="confirmation-message">
          <p>
            Your game account has been topped up successfully. The credits should be reflected in your game account
            immediately. If you don't see the credits in your account within 5 minutes, please contact our support team.
          </p>
        </div>

        <div className="confirmation-actions">
          <button className="home-button" onClick={handleGoHome}>
            <FaHome /> Go to Home
          </button>
          <button className="new-topup-button" onClick={handleNewTopUp}>
            <FaGamepad /> New Top-Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage
