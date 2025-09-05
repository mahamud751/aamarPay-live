/**
 * Utility function to implement retry logic with exponential backoff
 * @param fn - The async function to retry
 * @param retries - Number of retry attempts
 * @param delay - Initial delay in milliseconds
 * @param exponentialBase - Base for exponential backoff calculation
 * @returns Promise with the result of the function
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = 2,
  delay: number = 100,
  exponentialBase: number = 2
): Promise<T> {
  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === retries) {
        throw error;
      }
      const delayTime = delay * Math.pow(exponentialBase, i);
      console.log(`Attempt ${i + 1} failed. Retrying in ${delayTime}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  }

  throw lastError;
}

/**
 * Utility function to implement retry logic with exponential backoff for API calls
 * @param apiCall - The API call function to retry
 * @param retries - Number of retry attempts
 * @param delay - Initial delay in milliseconds
 * @returns Promise with the result of the API call
 */
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  retries: number = 2,
  delay: number = 100
): Promise<T> {
  return retryWithBackoff(apiCall, retries, delay, 2);
}
