import api from "./api";

const homeAPI = {
  productHot: async () => {
    try {
      const response = await api.get("/static/getproductHot");
      return response.data;
    } catch (error) {
      console.error("Lỗi :", error);
      throw error;
    }
  },
  productSales: async () => {
    try {
      const response = await api.get("/static/getSales");
      return response.data;
    } catch (error) {
      console.error("Lỗi :", error);
      throw error;
    }
  },
};

export default homeAPI;
