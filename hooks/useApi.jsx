"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Custom hook for API calls with loading, error, and data states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies for useEffect
 * @param {any} initialData - Initial data state
 * @param {any} fallbackData - Fallback data if API fails
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useApi(apiFunction, dependencies = [], initialData = null, fallbackData = null) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFunction()

      // Check if result is valid
      if (result !== null && result !== undefined) {
        setData(result)
      } else if (fallbackData !== null) {
        console.log("API returned null/undefined, using fallback data")
        setData(fallbackData)
      }
    } catch (err) {
      console.error("Error in useApi hook:", err.message)
      setError(err.message || "An error occurred")

      // Use fallback data if provided
      if (fallbackData !== null) {
        console.log("API error, using fallback data")
        setData(fallbackData)
      }
    } finally {
      setLoading(false)
    }
  }, [apiFunction, fallbackData])

  useEffect(() => {
    fetchData()
  }, [...dependencies, fetchData])

  // Return refetch function to allow manual refetching
  return { data, loading, error, refetch: fetchData }
}
