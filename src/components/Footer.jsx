
import { Link, useNavigate } from "react-router-dom"
import { FaFacebook, FaTelegram, FaInstagram, FaGamepad, FaDiscord, FaTiktok } from "react-icons/fa"
import "./Footer.css"


const Footer = () => {
  const navigate = useNavigate()

const handleHomeClickf = (e) => {
  e.preventDefault()
  if (window.location.pathname === "/") {
    window.scrollTo(0, 0)
  } else {
    navigate("/")
  }
  
  window.scrollTo(0, 0)
}
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <FaGamepad className="footer-logo-icon" />
            <span>Coppsary Bok luy</span>
          </div>
          <p className="footer-description">
            The fastest and most reliable game top-up service in Cambodia. Get your game credits instantly at the best
            prices.
          </p>
          <div className="social-icons">
            <a href="https://web.facebook.com/profile.php?id=61567582710788" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://discord.gg/Z396cHUP7G" target="_blank" rel="noopener noreferrer">
              <FaDiscord />
            </a>
            <a href="https://www.tiktok.com/@coppsary" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" onClick={handleHomeClickf}>Home</Link>
            </li>
            <li>
              <a href="/#games">Games</a>
            </li>
            <li>
              <a href="/#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="/#why-us">Why Us</a>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
        <h3>Support</h3>
          <ul className="footer-links">
            <li>
              <Link to="/support">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Coppsary. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
