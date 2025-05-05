import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import NotFoundPage from "./pages/NotFoundPage"
import "./index.css"
import "./pages/NotFoundPage.css"

// Error handler for React 18's new root API
window.addEventListener("error", (event) => {
  console.error("Global error caught:", event.error)
})

// Create a custom error handler for the root
const rootErrorHandler = (error) => {
  console.error("Root error handler caught:", error)
  // You could also log to an error tracking service here
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootErrorHandler,
)
