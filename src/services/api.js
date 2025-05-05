import axios from "axios"

// Use an absolute URL in development, relative URL in production
const API_URL = import.meta.env.DEV ? "http://localhost:5000/api" : "/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for debugging
    console.error("API Error:", error.message, error.response?.data || error)

    // Add custom error info
    const customError = new Error(
      error.response?.data?.message || "Network error. Please check your connection and try again.",
    )
    customError.status = error.response?.status || 500
    customError.originalError = error

    return Promise.reject(customError)
  },
)

// Improve the API service with better error handling and fallback mechanisms
export const getGames = async () => {
  try {
    console.log("API: Fetching games...")

    // Add a timeout to the API call
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 5000))

    // Race between the actual API call and the timeout
    const response = await Promise.race([api.get("/games"), timeoutPromise])

    console.log("API: Games fetched successfully")
    return response.data
  } catch (error) {
    console.error("API Error in getGames:", error.message)

    // Check if we're in development mode and use mock data
    if (import.meta.env.DEV) {
      console.log("API: Using mock data in development mode")
      return getMockGames()
    }

    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

// Add PUBG Mobile and Call of Duty Mobile to the mock games data
// Update the getMockGames function
// Ensure the getMockGames function returns all games consistently

// Update the getMockGames function to include all games
function getMockGames() {
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

// Similarly improve other API functions
export const getGamePackages = async (gameId) => {
  try {
    console.log(`API: Fetching packages for game ${gameId}...`)

    // Add a timeout to the API call
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 5000))

    // Race between the actual API call and the timeout
    const response = await Promise.race([api.get(`/games/${gameId}/packages`), timeoutPromise])

    console.log(`API: Packages fetched successfully for ${gameId}`)
    return response.data
  } catch (error) {
    console.error(`API Error in getGamePackages for ${gameId}:`, error.message)

    // Check if we're in development mode and use mock data
    if (import.meta.env.DEV) {
      console.log("API: Using mock package data in development mode")
      return getMockPackages(gameId)
    }

    // Return structured empty response instead of throwing
    return { gameInfo: null, packages: [] }
  }
}

// Also update the getMockPackages function to include the new games
function getMockPackages(gameId) {
  const gameInfo = {
    "mobile-legends": {
      name: "Mobile Legends",
      currency: "Diamonds",
      image: "/images/mobile-legends.jpg",
      description:
        "Mobile Legends: Bang Bang is a mobile multiplayer online battle arena (MOBA) game developed and published by Moonton.",
    },
    "free-fire": {
      name: "Free Fire",
      currency: "Diamonds",
      image: "/images/free-fire.jpg",
      description:
        "Garena Free Fire is a battle royale game, developed by 111 Dots Studio and published by Garena for Android and iOS.",
    },
    "clash-of-clans": {
      name: "Clash of Clans",
      currency: "Gems",
      image: "/images/clash-of-clans.jpg",
      description:
        "Clash of Clans is a free-to-play mobile strategy video game developed and published by Finnish game developer Supercell.",
    },
    "magic-chess": {
      name: "Magic Chess",
      currency: "Diamonds",
      image: "/images/magic-chess.jpg",
      description:
        "Magic Chess is an auto-battler game mode in Mobile Legends: Bang Bang where players compete against seven other players.",
    },
    "league-of-legends": {
      name: "League of Legends",
      currency: "Riot Points",
      image: "/images/league-of-legends.jpg",
      description: "League of Legends is a team-based strategy game developed and published by Riot Games.",
    },
    "pubg-mobile": {
      name: "PUBG Mobile",
      currency: "UC",
      image: "/images/pubg-mobile.jpg",
      description: "PUBG Mobile is a free-to-play battle royale game developed by LightSpeed & Quantum Studio.",
    },
    "call-of-duty-mobile": {
      name: "Call of Duty Mobile",
      currency: "CP",
      image: "/images/call-of-duty-mobile.jpg",
      description: "Call of Duty: Mobile is a free-to-play first-person shooter game developed by TiMi Studio Group.",
    },
  }[gameId] || {
    name: "Unknown Game",
    currency: "Credits",
    image: "/images/placeholder.jpg",
    description: "Game information not available.",
  }

  let packages = []

  if (gameId === "mobile-legends" || gameId === "free-fire" || gameId === "magic-chess") {
    packages = [
      { id: 1, name: "50 Diamonds", amount: 50, price: 2.5, currency: "Diamonds" },
      { id: 2, name: "100 Diamonds", amount: 100, price: 5, currency: "Diamonds" },
      { id: 3, name: "310 Diamonds", amount: 310, price: 10, currency: "Diamonds" },
      { id: 4, name: "520 Diamonds", amount: 520, price: 15, currency: "Diamonds" },
      { id: 5, name: "1060 Diamonds", amount: 1060, price: 30, currency: "Diamonds" },
      { id: 6, name: "2180 Diamonds", amount: 2180, price: 60, currency: "Diamonds" },
    ]
  } else if (gameId === "clash-of-clans") {
    packages = [
      { id: 1, name: "80 Gems", amount: 80, price: 1, currency: "Gems" },
      { id: 2, name: "500 Gems", amount: 500, price: 5, currency: "Gems" },
      { id: 3, name: "1200 Gems", amount: 1200, price: 10, currency: "Gems" },
      { id: 4, name: "2500 Gems", amount: 2500, price: 20, currency: "Gems" },
      { id: 5, name: "6500 Gems", amount: 6500, price: 50, currency: "Gems" },
      { id: 6, name: "14000 Gems", amount: 14000, price: 100, currency: "Gems" },
    ]
  } else if (gameId === "league-of-legends") {
    packages = [
      { id: 1, name: "650 RP", amount: 650, price: 5, currency: "Riot Points" },
      { id: 2, name: "1380 RP", amount: 1380, price: 10, currency: "Riot Points" },
      { id: 3, name: "2800 RP", amount: 2800, price: 20, currency: "Riot Points" },
      { id: 4, name: "5600 RP", amount: 5600, price: 40, currency: "Riot Points" },
      { id: 5, name: "11000 RP", amount: 11000, price: 75, currency: "Riot Points" },
    ]
  } else if (gameId === "pubg-mobile") {
    packages = [
      { id: 1, name: "60 UC", amount: 60, price: 0.99, currency: "UC" },
      { id: 2, name: "325 UC", amount: 325, price: 4.99, currency: "UC" },
      { id: 3, name: "660 UC", amount: 660, price: 9.99, currency: "UC" },
      { id: 4, name: "1800 UC", amount: 1800, price: 24.99, currency: "UC" },
      { id: 5, name: "3850 UC", amount: 3850, price: 49.99, currency: "UC" },
      { id: 6, name: "8100 UC", amount: 8100, price: 99.99, currency: "UC" },
    ]
  } else if (gameId === "call-of-duty-mobile") {
    packages = [
      { id: 1, name: "80 CP", amount: 80, price: 0.99, currency: "CP" },
      { id: 2, name: "400 CP", amount: 400, price: 4.99, currency: "CP" },
      { id: 3, name: "800 CP", amount: 800, price: 9.99, currency: "CP" },
      { id: 4, name: "2000 CP", amount: 2000, price: 24.99, currency: "CP" },
      { id: 5, name: "4000 CP", amount: 4000, price: 49.99, currency: "CP" },
      { id: 6, name: "8000 CP", amount: 8000, price: 99.99, currency: "CP" },
    ]
  } else {
    packages = [
      { id: 1, name: "Small Package", amount: 100, price: 5, currency: "Credits" },
      { id: 2, name: "Medium Package", amount: 300, price: 10, currency: "Credits" },
      { id: 3, name: "Large Package", amount: 500, price: 15, currency: "Credits" },
      { id: 4, name: "Premium Package", amount: 1000, price: 30, currency: "Credits" },
    ]
  }

  return { gameInfo, packages }
}

export const verifyGameAccount = async (gameId, userId, serverId) => {
  try {
    const response = await api.post("/verify-account", { gameId, userId, serverId })
    return response.data
  } catch (error) {
    console.error("Error verifying game account:", error)
    throw error
  }
}

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const generatePaymentQR = async (orderId, paymentMethod) => {
  try {
    const response = await api.post("/payment-gateway/generate-qr", {
      orderId,
      paymentMethod,
    })
    return response.data
  } catch (error) {
    console.error("Error generating payment QR:", error)
    throw error
  }
}

export const confirmPayment = async (orderId, transactionDetails) => {
  try {
    const response = await api.post(`/orders/${orderId}/confirm`, transactionDetails)
    return response.data
  } catch (error) {
    console.error("Error confirming payment:", error)
    throw error
  }
}

export const getOrderStatus = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching order status:", error)
    throw error
  }
}

export const submitSupportRequest = async (supportData) => {
  try {
    const response = await api.post("/support", supportData)
    return response.data
  } catch (error) {
    console.error("Error submitting support request:", error)
    throw error
  }
}
