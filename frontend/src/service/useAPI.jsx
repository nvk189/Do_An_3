import api from "./api";

const useAPI = {
  getAll: async () => {
    try {
      const response = await api.get("user/getAll");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
};

export default useAPI;
