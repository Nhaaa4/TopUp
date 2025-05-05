"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCreditCard, FaQrcode, FaCheckCircle } from "react-icons/fa"
import { useGameContext } from "../context/GameContext"
import "./PaymentPage.css"

const PaymentPage = () => {
  const navigate = useNavigate()
  const { selectedGame, selectedPackage, userId, serverId, setPaymentMethod, setOrderDetails } = useGameContext()

  const [loading, setLoading] = useState(false)
  const [qrLoading, setQrLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [qrCode, setQrCode] = useState(null)
  const [orderId, setOrderId] = useState(null)

  // Redirect if required data is missing
  useEffect(() => {
    if (!selectedGame || !selectedPackage || !userId) {
      navigate("/")
    }
  }, [selectedGame, selectedPackage, userId, navigate])

  const paymentMethods = [
    { id: "aceleda", name: "Aceleda Bank", icon: <FaCreditCard /> },
    { id: "aba", name: "ABA Bank", icon: <FaCreditCard /> },
  ]

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment)
    setQrCode(null)
  }

  const handleBack = () => {
    navigate("/verify")
  }

  const handleGenerateQR = async () => {
    if (!selectedPayment) return

    setQrLoading(true)
    setError(null)

    try {
      // First create an order
      const orderData = {
        gameId: selectedGame.id,
        packageId: selectedPackage.id,
        userId: userId,
        serverId: serverId || "",
        amount: selectedPackage.amount,
        price: selectedPackage.price,
        paymentMethod: selectedPayment.id,
      }

      // In a real app, you would create an order in the database
      // For now, we'll simulate a successful order creation
      const orderResponse = {
        orderId: "ORD" + Math.floor(Math.random() * 1000000),
        ...orderData,
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      setOrderId(orderResponse.orderId)

      // Then generate QR code for payment
      // In a real app, you would call the payment gateway API
      // For now, we'll simulate a QR code response
      const qrResponse = {
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + orderResponse.orderId,
        expiresIn: 900, // 15 minutes in seconds
      }

      setQrCode(qrResponse)
      setPaymentMethod(selectedPayment)
      setOrderDetails({
        orderId: orderResponse.orderId,
        ...orderData,
      })
    } catch (err) {
      setError("Failed to generate QR code. Please try again.")
    } finally {
      setQrLoading(false)
    }
  }

  const handleConfirmPayment = () => {
    navigate("/confirmation")
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment</h1>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <span>Game:</span>
              <span>{selectedGame?.name}</span>
            </div>
            <div className="summary-item">
              <span>Package:</span>
              <span>{selectedPackage?.name}</span>
            </div>
            <div className="summary-item">
              <span>Game ID:</span>
              <span>{userId}</span>
            </div>
            {serverId && (
              <div className="summary-item">
                <span>Server ID:</span>
                <span>{serverId}</span>
              </div>
            )}
            <div className="summary-item total">
              <span>Total:</span>
              <span>${selectedPackage?.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <span>{error}</span>
          </div>
        )}

        <div className="payment-methods">
          <h2>Select Payment Method</h2>
          <div className="payment-options">
            {paymentMethods.map((payment) => (
              <div
                key={payment.id}
                className={`payment-option ${selectedPayment?.id === payment.id ? "selected" : ""}`}
                onClick={() => handlePaymentSelect(payment)}
              >
                <div className="payment-icon">{payment.icon}</div>
                <span>{payment.name}</span>
                {selectedPayment?.id === payment.id && (
                  <div className="selected-indicator">
                    <FaCheckCircle />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedPayment && !qrCode && (
          <div className="payment-action">
            <button className="generate-qr-button" onClick={handleGenerateQR} disabled={qrLoading}>
              {qrLoading ? "Generating..." : "Generate QR Code"} {!qrLoading && <FaQrcode />}
            </button>
          </div>
        )}

        {qrCode && (
          <div className="qr-code-section">
            <h2>Scan QR Code to Pay</h2>
            <div className="qr-code-container">
              <img src={qrCode.qrCode || "/placeholder.svg"} alt="Payment QR Code" />
            </div>
            <div className="payment-instructions">
              <p>
                1. Open your {selectedPayment.name} mobile app
                <br />
                2. Scan the QR code above
                <br />
                3. Complete the payment of ${selectedPackage?.price.toFixed(2)}
                <br />
                4. Click the button below after payment
              </p>
            </div>
            <div className="order-id">
              <span>Order ID: {orderId}</span>
            </div>
            <button className="confirm-payment-button" onClick={handleConfirmPayment}>
              I've Completed the Payment <FaCheckCircle />
            </button>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="back-button" onClick={handleBack} disabled={loading}>
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
