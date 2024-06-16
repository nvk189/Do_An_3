import api from "./api";

const productAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/protype/getAll");

      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`protype/` + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  create: async (productData) => {
    try {
      const response = await api.post("protype/add", productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },

  update: async (id, productData) => {
    try {
      console.log(productData);
      const response = await api.put("/protype/update/" + id, productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },
};

export default productAPI;
