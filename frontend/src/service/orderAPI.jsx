import api from "./api";

const orderAPI = {
  create: async (productData) => {
    try {
      const response = await api.post("order/add", productData);
      return response.data;
    } catch (error) {
      console.error("Error while creating customer:", error);
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await api.get("order/getOrder");
      return response.data[0];
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getID: async (id) => {
    try {
      const response = await api.get(`order/getID/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  updateReal: async () => {
    try {
      const response = await api.put("/order/updateReal");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getShip: async () => {
    try {
      const response = await api.get("order/getShip");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getReal: async () => {
    try {
      const response = await api.get("order/getReal");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
  getFail: async () => {
    try {
      const response = await api.get("order/getFail");
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },

  updateFail: async (selectedOrders) => {
    try {
      const response = await api.put("/order/updateFail", {
        orderID: selectedOrders,
      });
      return response.data;
    } catch (error) {
      console.error("Error while updating orders:", error);
      throw error;
    }
  },

  // lấy tất cả thông tin đơn hàng của khách hàng
  getCusID: async (id) => {
    try {
      const response = await api.get(`order/orderCus/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },

  // update trạng thái cho 1 đơn hàng
  updateStatus: async (id) => {
    try {
      const response = await api.put(`order/updateOrder/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching customers:", error);
      throw error;
    }
  },
};

export default orderAPI;
