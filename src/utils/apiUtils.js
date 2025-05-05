/**
 * Utility function to handle API responses with fallback data
 * @param {Promise} apiCall - The API call promise
 * @param {any} fallbackData - Data to use if the API call fails
 * @param {Function} onSuccess - Optional callback for successful API calls
 * @param {Function} onError - Optional callback for failed API calls
 * @returns {Promise<any>} - The API response data or fallback data
 */
export const withFallback = async (apiCall, fallbackData, onSuccess, onError) => {
    try {
      const response = await apiCall
  
      // Check if response is valid (not empty, not null, etc.)
      const isValidResponse =
        response && (Array.isArray(response) ? response.length > 0 : Object.keys(response).length > 0)
  
      if (isValidResponse) {
        if (onSuccess) onSuccess(response)
        return response
      } else {
        console.log("API returned empty data, using fallback")
        if (onError) onError(new Error("Empty response"))
        return fallbackData
      }
    } catch (error) {
      console.error("API call failed:", error.message)
      if (onError) onError(error)
      return fallbackData
    }
  }
  
  /**
   * Creates a retry mechanism for API calls
   * @param {Function} apiFn - The API function to call
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Delay between retries in ms
   * @returns {Function} - A function that will retry the API call
   */
  export const withRetry = (apiFn, maxRetries = 3, delay = 1000) => {
    return async (...args) => {
      let lastError
  
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          return await apiFn(...args)
        } catch (error) {
          console.log(`API call failed, attempt ${attempt + 1} of ${maxRetries}`)
          lastError = error
  
          // Wait before next retry
          if (attempt < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }
  
      throw lastError
    }
  }
  