import api from "./api";

const homeAPI = {
  productHot: async () => {
    try {
      const response = await api.get("/static/getproductHot");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi truy xuất sản phẩm bán chạy:", error);
      throw error;
    }
  },
  productSales: async () => {
    try {
      const response = await api.get("/static/getSales");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi truy xuất sản phẩm bán chạy:", error);
      throw error;
    }
  },
};

export default homeAPI;
