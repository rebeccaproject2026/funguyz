const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

// Simulates a network delay for mock data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Backend Developer Instructions:
 * When the PHP APIs are ready, replace the `await delay(600); return mockFallback;` 
 * with a real HTTP request like:
 * 
 * try {
 *   const response = await fetch(`${API_BASE_URL}/products`);
 *   const data = await response.json();
 *   return data;
 * } catch (error) {
 *   console.error("API Error:", error);
 *   return mockFallback; // Fallback to mock data if API fails
 * }
 */

export const fetchProducts = async (mockFallback) => {
    // TODO: Replace with real PHP API call
    await delay(600);
    return mockFallback;
};

export const fetchBlogPosts = async (mockFallback) => {
    // TODO: Replace with real PHP API call
    await delay(600);
    return mockFallback;
};

export const fetchHeroSlides = async (mockFallback) => {
    // TODO: Replace with real PHP API call
    await delay(600);
    return mockFallback;
};

export const fetchFaqs = async (mockFallback) => {
    // TODO: Replace with real PHP API call
    await delay(600);
    return mockFallback;
};
