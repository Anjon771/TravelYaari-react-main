const rawApi = process.env.REACT_APP_API_URL;

export const API = (() => {
  if (!rawApi) return "";
  
  if (typeof window !== "undefined") {
    // If the API URL points to localhost but the page is served from a remote hostname,
    // do not attempt network requests to localhost, avoiding mixed-content and connection errors.
    const isLocalhostApi = rawApi.includes("localhost") || rawApi.includes("127.0.0.1");
    const isRemotePage = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
    if (isLocalhostApi && isRemotePage) {
      return "";
    }
    // Mixed content protection: An HTTPS website cannot make HTTP calls to external URLs
    if (window.location.protocol === "https:" && rawApi.startsWith("http://")) {
      return "";
    }
  }
  
  return rawApi;
})();
