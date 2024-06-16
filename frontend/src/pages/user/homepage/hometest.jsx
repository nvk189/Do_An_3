// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const hometest = () => {
//   const [auth, setAuth] = useState(false);

//   const [mess, setMess] = useState("");

//   const [email, setEmail] = useState("");

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     axios.get("http://localhost:8081").then((res) => {
//       if (res.data.Status === "ok") {
//         setAuth(true);

//         setEmail(res.data.cus_id);
//       } else {
//         setAuth(false);

//         setMess(res.data.Error);
//       }
//     });
//   }, []);

//   const handledelete = () => {
//     axios
//       .get("http://localhost:8081/logout")
//       .then((res) => {
//         location.reload(true);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="container mt-4">
//       {auth ? (
//         <div className="">
//           <h3>chào mừng {email}</h3>
//           <Link to="/login">
//             <button className="btn btn-danger" onClick={handledelete}>
//               đăng xuất
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div className="">
//           <h3>{mess}</h3>
//           <h3>đăng nhập</h3>
//           <Link to="/login" className="btn btn-primary">
//             đăng nhập
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default hometest;

import { Link } from "react-router-dom";
import useAuth from "../../../auth/useAuth";
const Hometest = () => {
  const { auth, email, mess, logout } = useAuth();

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>Chào mừng {email}</h3>
          <Link to="/login">
            <button className="btn btn-danger" onClick={logout}>
              Đăng xuất
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h3>{mess}</h3>
          <h3>Đăng nhập</h3>
          <Link to="/login" className="btn btn-primary">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hometest;
