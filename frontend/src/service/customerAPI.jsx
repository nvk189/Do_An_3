import api from "./api";

const customerAPI = {
  getAll: async () => {
    try {
      const response = await api.get("customer/getAll");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getByID: async (id) => {
    try {
      const response = await api.get("customer/" + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  create: async (customerData) => {
    try {
      const response = await api.post("cus/create", customerData);
      return response.data;
    } catch (error) {
      console.log("Error while creating customer:", error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put("/customer/update/" + id, data);
      return response.data;
    } catch (error) {
      console.log("Error while updating customer:", error);
      throw error;
    }
  },
};

export default customerAPI;
