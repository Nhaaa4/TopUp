import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import SupportPage from "./pages/SupportPage"
import ErrorBoundary from "./components/ErrorBoundary"
import { GameProvider } from "./context/GameContext"
import { ToastContainer } from "react-toastify"
import PromotionBanner from "./components/PromotionBanner"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

// Remove the import for QuickTopUpWidget since we're not using it anymore

function App() {
  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={5000} />
      <GameProvider>
        <PromotionBanner />
        <Navbar />
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/support" element={<SupportPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </GameProvider>
    </div>
  )
}

export default App
