// import axios from "axios";
// import { useState, useEffect } from "react";
// // import Navigation from "../components/NavigationDoctors";
// import { useNavigate, Link } from "react-router-dom";

// export default function Doctors() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     getUsers();
//   }, []); // this Empty array ensures this get effect runs only once

//   const email = localStorage.getItem("email");

//   const getUsers = () => {
//     axios({
//       method: "GET",
//       url: `http://127.0.0.1:5000/profile/${email}`,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         const res = response.data;
//         res.access_token;
//         setProfileData({
//           profile_id: res.id,
//           profile_fullname: res.fullname,
//           profile_username: res.username,
//           profile_email: res.email,
//           profile_phoneno: res.phoneno,
//         });
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       });
//   };
//   const registerpatient = () => {
//     // Perform your login logic here

//     // Navigate to the "admin" page if login is successful
//     navigate("/imageprediction");
//   };
//   const DoctorsReportAnalysis = () => {
//     // Perform your login logic here

//     // Navigate to the "admin" page if login is successful
//     navigate("/doctorsreportanalysis");
//   };

//   return (
//     <>
//       {/* <Navigation /> */}
//       {profileData && (
//         <div className="row g-0">
//           <h4>Welcome Back, {profileData.profile_email}</h4>
//           <Link
//             to={`/manageprofiledoctors/${profileData.profile_id}/edit`}
//             className="btn btn-sm btn-primary"
//           >
//             Edit Profile
//           </Link>
//           <h4>Upload Bone Image</h4>
//           <button className="btn btn-sm btn-primary" onClick={registerpatient}>
//             Click Here Upload Image
//           </button>
//         </div>
//       )}
//       <table className="table table-striped table-border table-hover">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Ahmad Farhan</td>
//             <td>10/01/2023</td>
//             <td>2.30 pm</td>
//           </tr>
//         </tbody>
//         <button
//           className="btn btn-sm btn-primary"
//           onClick={DoctorsReportAnalysis}
//         >
//           See History Report Analysis
//         </button>
//       </table>
//     </>
//   );
// }
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment-timezone";

export default function Doctors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    getUsers();
    getAnalysis();
  }, []); // this Empty array ensures this get effect runs only once

  const email = localStorage.getItem("email");

  const getUsers = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
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
          profile_fullname: res.fullname,
          profile_username: res.username,
          profile_email: res.email,
          profile_phoneno: res.phoneno,
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

  const getAnalysis = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/listpredict", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalysisData(response.data);
    } catch (error) {
      console.error("There was an error fetching the analysis data!", error);
    }
  };

  const registerpatient = () => {
    navigate("/imageprediction");
  };

  const DoctorsReportAnalysis = () => {
    navigate("/doctorsreportanalysis");
  };

  return (
    <>
      {profileData && (
        <div className="row g-0">
          <h4>Welcome Back, {profileData.profile_fullname}</h4>
          <Link
            to={`/manageprofiledoctors/${profileData.profile_id}/edit`}
            className="btn btn-sm btn-primary"
          >
            Edit Profile
          </Link>
          <h4>Upload Bone Image</h4>
          <button className="btn btn-sm btn-primary" onClick={registerpatient}>
            Click Here Upload Image
          </button>
        </div>
      )}
      {analysisData && (
        <>
          <h1>History Report Analysis</h1>
          <table className="table table-striped table-border table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Prediction</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((predict, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{predict.fullname}</td>
                  <td>{predict.gender}</td>
                  <td>{predict.age}</td>
                  <td
                    className={`font-semibold text-${
                      predict.resultprediction === "Normal"
                        ? "success"
                        : "danger"
                    }`}
                  >
                    {predict.resultprediction}
                  </td>
                  <td>
                    {moment(predict.datetimeprediction).format("DD MMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button
        className="btn btn-sm btn-primary"
        onClick={DoctorsReportAnalysis}
      >
        See History Report Analysis
      </button>
    </>
  );
}
