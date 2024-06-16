import api from "./api";

const staticAPI = {
  getStatic: async () => {
    try {
      const response = await api.get("/static/getstatic");
      return response.data[0];
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getDate: async () => {
    try {
      const response = await api.get("/static/getdate");
      return response.data[0];
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getProduct: async () => {
    try {
      const response = await api.get("/static/getproductHot");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getAllCheck: async () => {
    try {
      const response = await api.get("/static/getAllcheck");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  updateStatus: async () => {
    try {
      const response = await api.put("/static/updatstatus");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
};

export default staticAPI;
