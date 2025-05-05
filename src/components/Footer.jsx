import { Link } from "react-router-dom"
import { FaFacebook, FaTelegram, FaInstagram, FaGamepad } from "react-icons/fa"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <FaGamepad className="footer-logo-icon" />
            <span>GameTopUp</span>
          </div>
          <p className="footer-description">
            The fastest and most reliable game top-up service in Cambodia. Get your game credits instantly at the best
            prices.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#games">Games</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#why-us">Why Us</a>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Games</h3>
          <ul className="footer-links">
            <li>
              <Link to="/topup/mobile-legends">Mobile Legends</Link>
            </li>
            <li>
              <Link to="/topup/pubg-mobile">PUBG Mobile</Link>
            </li>
            <li>
              <Link to="/topup/call-of-duty-mobile">Call of Duty Mobile</Link>
            </li>
            <li>
              <Link to="/topup/free-fire">Free Fire</Link>
            </li>
            <li>
              <Link to="/topup/clash-of-clans">Clash of Clans</Link>
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
        <p>&copy; {new Date().getFullYear()} GameTopUp. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
