// import axios from "axios";
// import React, { useState, useEffect } from "react";
// // import Navigation from "../components/NavigationDoctors";
// import { useNavigate } from "react-router-dom";
// import DoctorsHeader from "../../components/DoctorsHeader";

// export default function Doctors(props) {
//   const navigate = useNavigate();

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
//         Authorization: "Bearer " + props.token,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         const res = response.data;
//         res.access_token && props.setToken(res.access_token);
//         setProfileData({
//           profile_name: res.name,
//           profile_email: res.email,
//           about_me: res.about,
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

//   const editprofile = () => {
//     // Perform your login logic here

//     // Navigate to the "admin" page if login is successful
//     navigate("/manageprofiledoctors");
//   };
//   const registerpatient = () => {
//     // Perform your login logic here

//     // Navigate to the "admin" page if login is successful
//     navigate("/registerpatients");
//   };
//   const DoctorsReportAnalysis = () => {
//     // Perform your login logic here

//     // Navigate to the "admin" page if login is successful
//     navigate("/doctorsreportanalysis");
//   };

//   return (
//     <>
//       <DoctorsHeader>
//         {/* <Navigation /> */}
//         {profileData && (
//           <div className="row g-0">
//             <h4>Welcome Back, {profileData.profile_email}</h4>
//             <button className="btn btn-sm btn-primary" onClick={editprofile}>
//               Edit Profile
//             </button>
//             <h4>Analysis Result History</h4>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={DoctorsReportAnalysis}
//             >
//               Click Here To See
//             </button>
//             <h4>Upload Bone Image</h4>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={registerpatient}
//             >
//               Click Here Upload Image
//             </button>
//           </div>
//         )}
//         <table className="table table-striped table-border table-hover">
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Name</th>
//               <th>Date</th>
//               <th>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Ahmad Farhan</td>
//               <td>10/01/2023</td>
//               <td>2.30 pm</td>
//             </tr>
//           </tbody>
//           <button className="btn btn-sm btn-primary">
//             See History Report Analysis
//           </button>
//         </table>
//       </DoctorsHeader>
//     </>
//   );
// }
import axios from "axios";
import React, { useState, useEffect } from "react";
// import Navigation from "../components/NavigationDoctors";
import { useNavigate } from "react-router-dom";

export default function Doctors(props) {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getUsers();
  }, []); // this Empty array ensures this get effect runs only once

  const email = localStorage.getItem("email");

  const getUsers = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          profile_email: res.email,
          about_me: res.about,
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

  const editprofile = () => {
    // Perform your login logic here

    // Navigate to the "admin" page if login is successful
    navigate("/manageprofiledoctors");
  };
  const registerpatient = () => {
    // Perform your login logic here

    // Navigate to the "admin" page if login is successful
    navigate("/registerpatients");
  };
  const DoctorsReportAnalysis = () => {
    // Perform your login logic here

    // Navigate to the "admin" page if login is successful
    navigate("/doctorsreportanalysis");
  };

  return (
    <>
      {/* <Navigation /> */}
      {profileData && (
        <div className="row g-0">
          <h4>Welcome Back, {profileData.profile_email}</h4>
          <button className="btn btn-sm btn-primary" onClick={editprofile}>
            Edit Profile
          </button>
          <h4>Analysis Result History</h4>
          <button
            className="btn btn-sm btn-primary"
            onClick={DoctorsReportAnalysis}
          >
            Click Here To See
          </button>
          <h4>Upload Bone Image</h4>
          <button className="btn btn-sm btn-primary" onClick={registerpatient}>
            Click Here Upload Image
          </button>
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
            <td>Ahmad Farhan</td>
            <td>10/01/2023</td>
            <td>2.30 pm</td>
          </tr>
        </tbody>
        <button className="btn btn-sm btn-primary">
          See History Report Analysis
        </button>
      </table>
    </>
  );
}
