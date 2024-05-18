import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Doctors from "./pages/doctors/Doctors";
import Admin from "./pages/admin/Admin";
import ManageProfileAdmin from "./pages/admin/ManageProfileAdmin";
import ListUserPage from "./pages/ListUserPage";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import useToken from "./pages/useToken";
import AdminHeader from "./components/AdminHeader";
import DoctorsHeader from "./components/DoctorsHeader";
import ProtectedRouteAdmin from "./router/ProtectedRouteAdmin";
import ProtectedRouteDoctors from "./router/ProtectedRouteDoctors";

function App() {
  const { token, removeToken, setToken } = useToken();
  const [role, setRole] = useState("");

  const handleLogin = (response, isAdmin) => {
    const tokenKey = isAdmin ? "admin_token" : "doctor_token";
    setToken(response.data[tokenKey]);
    setRole(isAdmin ? "admin" : "doctor");
    alert("Successfully Login");
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("role", isAdmin ? "admin" : "doctor");
  };

  return (
    <div className="vh-100 gradient-custom">
      <Router>
        {!token && token !== "" && token !== undefined ? (
          <Login setToken={setToken} handleLogin={handleLogin} />
        ) : (
          <>
            <Routes>
              <Route element={<ProtectedRouteAdmin />}>
                <Route element={<AdminHeader removeToken={removeToken} />}>
                  <Route path="/admin" element={<Admin />} exact />

                  <Route
                    path="/manageprofileadmin"
                    element={<ManageProfileAdmin />}
                    exact
                  />

                  <Route path="/test" element={<ListUserPage />} />

                  <Route path="/addnewuser" element={<CreateUser />} />

                  <Route path="/user/:id/edit" element={<EditUser />} />
                </Route>
              </Route>
              <Route element={<ProtectedRouteDoctors />}>
                <Route element={<DoctorsHeader removeToken={removeToken} />}>
                  <Route path="/doctors" element={<Doctors />} exact />
                </Route>
              </Route>
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
