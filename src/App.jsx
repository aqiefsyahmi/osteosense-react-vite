/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import ManageProfileAdmin from "./pages/admin/ManageProfileAdmin";
import RegisterDoctorProfile from "./pages/admin/RegisterDoctorProfile";
import AdminEditDoctors from "./pages/admin/AdminEditDoctors";
import AdminEditDoctorsDetail from "./pages/admin/AdminEditDoctorsDetail";
import AdminEditPatientDetails from "./pages/admin/AdminEditPatientDetails";
import ViewPatientList from "./pages/admin/ViewPatientList";
import AdminReportAnalysisList from "./pages/admin/AdminReportAnalysisList";
import AdminReportAnalysis from "./pages/admin/AdminReportAnalysis";
import AdminReportAnalysisDetails from "./pages/admin/AdminReportAnalysisDetails";
import AllAnalysisLists from "./pages/admin/AllAnalysisLists";
import AnalysisListDetails from "./pages/admin/AnalysisListDetails";
import Doctors from "./pages/doctors/Doctors";
import ManageProfileDoctors from "./pages/doctors/ManageProfileDoctors";
import RegisterPatients from "./pages/doctors/RegisterPatients";
import DoctorsReportAnalysis from "./pages/doctors/DoctorsReportAnalysis";
import DoctorsReportAnalysisDetails from "./pages/doctors/DoctorsReportAnalysisDetails";
import PatientList from "./pages/doctors/PatientList";
import ManageProfilePatients from "./pages/doctors/ManageProfilePatients";
import ImagePrediction from "./pages/doctors/ImagePrediction";
import useToken from "./pages/useToken";
import AdminHeader from "./components/AdminHeader";
import DoctorsHeader from "./components/DoctorsHeader";
import ProtectedRouteAdmin from "./router/ProtectedRouteAdmin";
import ProtectedRouteDoctors from "./router/ProtectedRouteDoctors";
import NotFoundPage from "./router/NotFoundPage";
import "./components/CustomStyle.css";

function App() {
  const { token, removeToken, setToken } = useToken();
  const [role, setRole] = useState("");

  const handleLogin = (response, isAdmin) => {
    const tokenKey = isAdmin ? "admin_token" : "doctor_token";
    setToken(response.data[tokenKey]);
    setRole(isAdmin ? "admin" : "doctor");
    alert("Successfully Login");
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("role", isAdmin ? "admin" : "doctor");
  };

  return (
    <div className="vh-100 gradient-custom">
      <Router>
        {token === null || token === undefined ? (
          <Login setToken={setToken} handleLogin={handleLogin} />
        ) : (
          <>
            <Routes>
              <Route element={<ProtectedRouteAdmin />}>
                <Route element={<AdminHeader removeToken={removeToken} />}>
                  <Route path="/admin" element={<Admin />} exact />
                  <Route
                    path="/registerdoctorprofile"
                    element={<RegisterDoctorProfile />}
                  />
                  <Route
                    path="/admineditdoctors"
                    element={<AdminEditDoctors />}
                  />
                  <Route
                    path="/admineditdoctor/:id/edit"
                    element={<AdminEditDoctorsDetail />}
                  />
                  <Route
                    path="/patientdetailupdate/:id/edit" //
                    element={<AdminEditPatientDetails />}
                  />
                  <Route
                    path="/viewpatientlist"
                    element={<ViewPatientList />}
                  />
                  <Route
                    path="/adminreportanalysislist"
                    element={<AdminReportAnalysisList />}
                  />
                  <Route
                    path="/adminreportanalysislist/:id/doctorlist"
                    element={<AdminReportAnalysis />}
                  />
                  <Route
                    path="/adminpredictlistdetails/:id/edit"
                    element={<AdminReportAnalysisDetails />}
                  />
                  <Route
                    path="/allanalysislists"
                    element={<AllAnalysisLists />}
                  />
                  <Route
                    path="/predictlistdetails/:id/view"
                    element={<AnalysisListDetails />}
                  />
                  <Route
                    path="/manageprofileadmin/:id/edit"
                    element={<ManageProfileAdmin />}
                  />
                </Route>
              </Route>
              <Route element={<ProtectedRouteDoctors />}>
                <Route element={<DoctorsHeader removeToken={removeToken} />}>
                  <Route path="/doctors" element={<Doctors />} exact />
                  <Route
                    path="/manageprofiledoctors/:id/edit"
                    element={<ManageProfileDoctors />}
                  />
                  <Route
                    path="/registerpatients"
                    element={<RegisterPatients />}
                  />
                  <Route
                    path="/doctorsreportanalysis"
                    element={<DoctorsReportAnalysis />}
                  />
                  <Route
                    path="/predictlistdetails/:id/edit"
                    element={<DoctorsReportAnalysisDetails />}
                  />
                  <Route path="/patientlist" element={<PatientList />} />
                  <Route
                    path="/patientupdate/:id/edit" //
                    element={<ManageProfilePatients />}
                  />
                  <Route
                    path="/imageprediction" //
                    element={<ImagePrediction />}
                  />
                </Route>
              </Route>
              <Route
                path="*"
                element={<NotFoundPage removeToken={removeToken} />}
              />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
