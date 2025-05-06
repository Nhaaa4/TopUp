"use client"

import { useState, useEffect, useRef } from "react"
import { FaGamepad, FaMoneyBillWave, FaShieldAlt, FaUserClock, FaHeadset, FaGift, FaStar, FaFire } from "react-icons/fa"
import TopUpFlow from "../components/TopUpFlow"
import { useGameContext } from "../context/GameContext"
import "./HomePage.css"

const HomePage = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState(null)
  const featuredGamesRef = useRef(null)
  const { isTopUpInProgress } = useGameContext()

  // Update the useEffect hook that fetches games to ensure all games are displayed
  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       setLoading(true)
  //       setError(null)
  //       const gamesData = await getGames()

  //       if (gamesData && gamesData.length > 0) {
  //         // Ensure we're getting all games from the API
  //         console.log(`Fetched ${gamesData.length} games from API`)
  //         setGames(gamesData)
  //       } else {
  //         // If API returns empty array, use fallback data
  //         console.log("Using fallback game data")
  //         setGames(getAllFallbackGames())
  //       }
  //     } catch (err) {
  //       console.error("Error in HomePage:", err)
  //       setError("Failed to load games. Using default game list instead.")
  //       setGames(getAllFallbackGames())
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchGames()
  // }, [])

  // Updated fallback games function to ensure all games are included
  const getAllFallbackGames = () => {
    return [
      { id: "mobile-legends", name: "Mobile Legends", image: "/images/mobile-legends.jpg" },
      { id: "free-fire", name: "Free Fire", image: "/images/free-fire.jpg" },
      { id: "pubg-mobile", name: "PUBG Mobile", image: "/images/pubg-mobile.jpg" },
      { id: "call-of-duty-mobile", name: "Call of Duty Mobile", image: "/images/call-of-duty-mobile.jpg" },
      { id: "clash-of-clans", name: "Clash of Clans", image: "/images/clash-of-clans.jpg" },
      { id: "magic-chess", name: "Magic Chess", image: "/images/magic-chess.jpg" },
      { id: "league-of-legends", name: "League of Legends", image: "/images/league-of-legends.jpg" },
    ]
  }

  // Use the updated fallback games function
  const fallbackGames = getAllFallbackGames()
  useEffect(() => {
    setGames(fallbackGames)
    setLoading(false)
  }, [fallbackGames])

  // Featured games - could be from an API in a real app
  const featuredGames = [
    {
      id: "mobile-legends",
      name: "Mobile Legends",
      image: "/images/mobile-legends.jpg",
      discount: "10% OFF",
      description: "Get bonus diamonds on all packages",
    },
    {
      id: "pubg-mobile",
      name: "PUBG Mobile",
      image: "/images/pubg-mobile.jpg",
      discount: "15% OFF",
      description: "Special weekend offer on UC purchases",
    },
    {
      id: "call-of-duty-mobile",
      name: "Call of Duty Mobile",
      image: "/images/call-of-duty-mobile.jpg",
      discount: "20% OFF",
      description: "Limited time promotion on CP packages",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sokha Chen",
      game: "Mobile Legends",
      rating: 5,
      comment: "Super fast delivery! I received my diamonds instantly after payment. Will definitely use again.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Dara Kim",
      game: "Free Fire",
      rating: 5,
      comment: "Best prices I've found for Free Fire diamonds. The process was simple and quick.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Vibol Meas",
      game: "Clash of Clans",
      rating: 4,
      comment: "Great service and support. They helped me when I had an issue with my payment.",
      date: "2 weeks ago",
    },
  ]

  const openTopUpModal = (gameId = null) => {
    // Prevent opening multiple top-up flows
    if (isTopUpInProgress) {
      console.log("Top-up already in progress, ignoring request")
      return
    }

    if (gameId) {
      console.log("Opening top-up modal for game:", gameId)
      // Find the game in our local data to ensure we have the details
      const gameData = games.find((game) => game.id === gameId) || fallbackGames.find((game) => game.id === gameId)

      if (gameData) {
        // Set the selected game in context before opening modal
        setSelectedGameId(gameId)
        setIsTopUpModalOpen(true)
      } else {
        console.error("Game not found:", gameId)
        // Use fallback approach - just open modal without pre-selecting
        setSelectedGameId(null)
        setIsTopUpModalOpen(true)
      }
    } else {
      // No game selected, just open the modal
      setSelectedGameId(null)
      setIsTopUpModalOpen(true)
    }
  }

  const closeTopUpModal = () => {
    setIsTopUpModalOpen(false)
    setSelectedGameId(null)
  }

  const scrollToFeaturedGames = () => {
    if (featuredGamesRef.current) {
      featuredGamesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Generate star ratings
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />)
    }
    return stars
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Top Up Your Game Credits Instantly</h1>
          <p>Fast, secure, and affordable game top-up service in Cambodia</p>
          <div className="hero-buttons">
            <button onClick={() => openTopUpModal()} className="cta-button">
              Top Up Now
            </button>
            <button onClick={scrollToFeaturedGames} className="secondary-button">
              View Promotions
            </button>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section ref={featuredGamesRef} className="featured-games-section">
        <div className="section-header">
          <h2>Special Promotions</h2>
          <p>Limited time offers on popular games</p>
        </div>

        <div className="featured-games-container">
          {featuredGames.map((game) => (
            <div key={game.id} className="featured-game-card" onClick={() => openTopUpModal(game.id)}>
              <div className="featured-game-image">
                <img src={game.image || "/placeholder.svg"} alt={game.name} />
                <div className="discount-badge">
                  <FaFire className="discount-icon" />
                  <span>{game.discount}</span>
                </div>
              </div>
              <div className="featured-game-content">
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <button className="featured-game-button">
                  <FaGift className="button-icon" /> Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="games-section">
        <div className="section-header">
          <h2>Popular Games</h2>
          <p>Select your game to get started with the top-up process</p>
        </div>

        {loading ? (
          <div className="loading">Loading games...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => {
                  console.log("Game card clicked:", game.id)
                  openTopUpModal(game.id)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openTopUpModal(game.id)
                  }
                }}
              >
                <div className="game-image">
                  <img src={game.image || `/images/${game.id}.jpg`} alt={game.name} />
                </div>
                <h3>{game.name}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Complete your top-up in just 3 simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <FaGamepad />
            </div>
            <h3>Select Game</h3>
            <p>Choose your game and the amount of credits you want to purchase</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <FaUserClock />
            </div>
            <h3>Enter ID</h3>
            <p>Provide your game ID and server information for verification</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Make Payment</h3>
            <p>Complete the payment using your preferred method and get instant credits</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Trusted by gamers across Cambodia</p>
        </div>

        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
              <p className="testimonial-comment">"{testimonial.comment}"</p>
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-game">{testimonial.game}</div>
                <div className="testimonial-date">{testimonial.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>We offer the best game top-up experience in Cambodia</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Competitive Pricing</h3>
            <p>We offer the best rates for game credits with no hidden fees</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUserClock />
            </div>
            <h3>Fast Service</h3>
            <p>Get your game credits instantly after payment confirmation</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure & Reliable</h3>
            <p>Your transactions and personal information are always protected</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaGamepad />
            </div>
            <h3>No Login Required</h3>
            <p>Top up using just your game ID without sharing your password</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaHeadset />
            </div>
            <h3>24/7 Support</h3>
            <p>Our customer support team is always ready to assist you</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Top Up Your Game?</h2>
          <p>Get started now and enjoy your game with extra credits</p>
          <button onClick={scrollToFeaturedGames} className="cta-button">
            Top Up Now
          </button>
        </div>
      </section>

      {/* TopUp Flow Modal */}
      <TopUpFlow
        isOpen={isTopUpModalOpen}
        onClose={closeTopUpModal}
        initialStep={selectedGameId ? "package" : "game"}
        gameId={selectedGameId}
      />
    </div>
  )
}

export default HomePage
