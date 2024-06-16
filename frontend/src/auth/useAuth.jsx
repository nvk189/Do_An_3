import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState("");
  const [mess, setMess] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8081", {
          withCredentials: true,
        });
        if (res.data.Status === "ok") {
          setAuth(true);
          setId(res.data.cus_id);
        } else {
          setAuth(false);
          setMess(res.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:8081/logout", {
        withCredentials: true,
      });
      setAuth(false);
      setId("");
      location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return { auth, id, mess, logout };
};

export default useAuth;
