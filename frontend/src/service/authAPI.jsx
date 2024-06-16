import api from "../service/api";

const authAPI = {
  register: async (register) => {
    try {
      const response = await api.post("register/", register);
      return response.data;
    } catch (error) {
      console.log("lỗi khi đăng ký:", error);
      throw error;
    }
  },
  login: async (values) => {
    try {
      const response = await api.post("/login", values);

      return response;
    } catch (error) {
      console.log("lỗi khi đăng ký:", error);
      throw error;
    }
  },
  verifyUser: async () => {
    try {
      const response = await api.get("/");
      return response;
    } catch (error) {
      console.log("lỗi đăng nhập:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.get("/logout");
      return response;
    } catch (error) {
      console.log("lỗi đăng xuất:", error);
      throw error;
    }
  },
};

export default authAPI;
