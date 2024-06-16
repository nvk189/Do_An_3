import api from "./api";
const suppAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/supp/getAll");
      return response.data;
    } catch (error) {
      console.error("Error while fetching suppliers:", error);
      throw error;
    }
  },
  getByID: async (id) => {
    try {
      const response = await api.get(`supp/` + id);
      return response.data;
    } catch (error) {
      console.error("Error while fetching suppliers:", error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      console.log(data);
      const response = await api.post("/supp/add", data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error while creating customer:", error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await api.put("/supp/update/" + id, data);
      return response.data;
    } catch (error) {
      console.error("Error while updating supplier:", error);
      throw error;
    }
  },
};

export default suppAPI;
