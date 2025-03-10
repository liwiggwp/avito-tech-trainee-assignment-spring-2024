import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const httpService = () => {
  const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    get: async (url) => {
      try {
        const response = await http.get(url);
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
};

export default httpService;
