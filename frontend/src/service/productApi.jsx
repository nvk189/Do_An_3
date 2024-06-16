import api from "./api";

const productAPI = {
  // lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const response = await api.get("/product/getAll");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  // lấy tất cả sản phẩm theo danh mục
  getAllType: async (id) => {
    try {
      const response = await api.get("/product/getAlltype/" + id);
      return response.data.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  // tìm kiếm
  searchProduct: async (id) => {
    try {
      const response = await api.get("/product/searchProduct/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  // lấy sản phẩm theo danh mục
  getById: async (id) => {
    try {
      const response = await api.get("product/getProtype/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  // lấy thông tin sản phảm theo id
  getId: async (id) => {
    try {
      const response = await api.get("product/getAllPro/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },

  // thêm sản phẩm
  create: async (productData) => {
    try {
      const response = await api.post("product/add", productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },

  // sửa thông tin sản phẩm
  update: async (id, productData) => {
    try {
      const response = await api.put("product/update/" + id, productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },
};

export default productAPI;
