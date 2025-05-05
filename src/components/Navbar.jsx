"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaGamepad, FaBars, FaTimes, FaHome, FaInfoCircle, FaQuestionCircle, FaHeadset } from "react-icons/fa"
import "./Navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    closeMenu()
    navigate("/")
    window.scrollTo(0, 0)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
          <FaGamepad className="logo-icon" />
          <span>Coppsary Bok Luy</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleHomeClick}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <a href="#games" className="nav-link" onClick={closeMenu}>
              <FaGamepad className="nav-icon" />
              <span>Games</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#how-it-works" className="nav-link" onClick={closeMenu}>
              <FaInfoCircle className="nav-icon" />
              <span>How It Works</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#why-us" className="nav-link" onClick={closeMenu}>
              <FaQuestionCircle className="nav-icon" />
              <span>Why Us</span>
            </a>
          </li>
          <li className="nav-item">
            <Link to="/support" className="nav-link" onClick={closeMenu}>
              <FaHeadset className="nav-icon" />
              <span>Support</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
