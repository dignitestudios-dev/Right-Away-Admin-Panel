import axios from "axios";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
export const baseURL = "https://api.rightawayapp.com/"; // Replace with your actual base URL
let cachedDeviceId: string | null = null;

export async function getDeviceFingerprint() {
  if (cachedDeviceId) return cachedDeviceId;

  if (typeof window === "undefined") {
    // Running on server, return a fallback ID or empty string
    return "server-device-id";
  }

  const fp = await import("@fingerprintjs/fingerprintjs"); // dynamic import only on client
  const agent = await fp.load();
  const result = await agent.get();
  cachedDeviceId = result.visitorId;

  return cachedDeviceId;
}


  const deviceId = await getDeviceFingerprint();
const headers = {
  "Content-Type": "application/json",
  devicemodel: deviceId,
    deviceuniqueid: deviceId,
};
const formDataHeaders = {
  "Content-Type": "multipart/form-data",
};

// Create an Axios instance
export const API = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Set a timeout (optional)
  headers: headers,
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from storage
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("authToken"); // Remove token if unauthorized
      window.location.href = "/auth/login"; // Redirect to login page
    }
    console.log(error);
    console.log("API Error:", error.response?.data || error);
    return Promise.reject(error);
  }
);
