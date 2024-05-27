import axios from "axios";
import { useState, useEffect } from "react";
// import Navigation from "../components/NavigationDoctors";
import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getAdmin();
  }, []); // this Empty array ensures this get effect runs only once

  const email = localStorage.getItem("email");

  const getAdmin = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profileadmin/${email}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token;
        setProfileData({
          profile_id: res.id,
          profile_username: res.username,
          profile_email: res.email,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const historyanalysis = () => {
    navigate("/adminreportanalysislist");
  };

  const testimage = () => {
    navigate("/upload-image");
  };

  return (
    <>
      {/* <Header /> */}
      {/* <Navigation /> */}
      <h4>Doctors</h4>
      <h5>100</h5>
      <h4>Prediction Tested</h4>
      <h5>2150</h5>
      {profileData && (
        <div>
          <h4>Welcome Back, {profileData.profile_username}</h4>
          <Link
            className="btn btn-sm btn-primary"
            to={`/manageprofileadmin/${profileData.profile_id}/edit`}
          >
            Edit Profile
          </Link>
        </div>
      )}
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dr. Jamaluddin</td>
            <td>10/01/2023</td>
            <td>2.30 pm</td>
          </tr>
        </tbody>
        <button className="btn btn-sm btn-primary" onClick={historyanalysis}>
          See History Report Analysis
        </button>
        <button className="btn btn-sm btn-primary" onClick={testimage}>
          Test Upload Image
        </button>
      </table>
    </>
  );
}
