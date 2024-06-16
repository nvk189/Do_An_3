// import axios from "axios";
import api from "./api";
const proImport = {
  getAll: async () => {
    try {
      const response = await api.get("/import/getAll");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get("import/getImport/" + id);
      // console.log(response.data);
      return response.data[0];
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  create: async (productData) => {
    try {
      const response = await api.post("import/add", productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },

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

export default proImport;
