"use client"

import { useState } from "react"
import { FaPaperPlane, FaPhone, FaEnvelope, FaComments } from "react-icons/fa"
import "./SupportPage.css"

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In a real app, you would submit the form to the API
      // For now, we'll simulate a successful submission
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 1500)
    } catch (err) {
      setError("Failed to submit your request. Please try again later.")
      setLoading(false)
    }
  }

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-header">
          <h1>Customer Support</h1>
          <p>We're here to help! Fill out the form below or contact us directly.</p>
        </div>

        <div className="support-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+855 12 345 678</p>
                  <p>Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>support@gametopup.com</p>
                  <p>We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaComments />
                </div>
                <div className="contact-details">
                  <h3>Live Chat</h3>
                  <p>Available on our website</p>
                  <p>24/7 Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send Us a Message</h2>

            {success ? (
              <div className="success-message">
                <FaPaperPlane />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div className="form-error">{error}</div>}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <div className="input-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <div className="input-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                  />
                  {errors.subject && <div className="input-error">{errors.subject}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                  ></textarea>
                  {errors.message && <div className="input-error">{errors.message}</div>}
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"} {!loading && <FaPaperPlane />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
