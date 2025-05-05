import { Link } from "react-router-dom"
import { FaHome, FaExclamationTriangle } from "react-icons/fa"

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div className="actions">
          <Link to="/" className="home-button">
            <FaHome /> Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
