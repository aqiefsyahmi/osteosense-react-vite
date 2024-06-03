// import axios from "axios";
// import { useState, useEffect } from "react";
// // import Navigation from "../components/NavigationDoctors";
// import { useNavigate, Link } from "react-router-dom";

// export default function Admin() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     getAdmin();
//   }, []); // this Empty array ensures this get effect runs only once

//   const email = localStorage.getItem("email");

//   const getAdmin = () => {
//     axios({
//       method: "GET",
//       url: `http://127.0.0.1:5000/profileadmin/${email}`,
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
//           profile_username: res.username,
//           profile_email: res.email,
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

//   const historyanalysis = () => {
//     navigate("/adminreportanalysislist");
//   };

//   const testimage = () => {
//     navigate("/upload-image");
//   };

//   return (
//     <>
//       {/* <Header /> */}
//       {/* <Navigation /> */}
//       <h4>Doctors</h4>
//       <h5>100</h5>
//       <h4>Prediction Tested</h4>
//       <h5>2150</h5>
//       {profileData && (
//         <div>
//           <h4>Welcome Back, {profileData.profile_username}</h4>
//           <Link
//             className="btn btn-sm btn-primary"
//             to={`/manageprofileadmin/${profileData.profile_id}/edit`}
//           >
//             Edit Profile
//           </Link>
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
//             <td>Dr. Jamaluddin</td>
//             <td>10/01/2023</td>
//             <td>2.30 pm</td>
//           </tr>
//         </tbody>
//         <button className="btn btn-sm btn-primary" onClick={historyanalysis}>
//           See History Report Analysis
//         </button>
//         <button className="btn btn-sm btn-primary" onClick={testimage}>
//           Test Upload Image
//         </button>
//       </table>
//     </>
//   );
// }
import axios from "axios";
import { useState, useEffect } from "react";
// import Navigation from "../components/NavigationDoctors";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment-timezone";

export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [profileData, setProfileData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [predictCount, setPredictCount] = useState(0);

  useEffect(() => {
    getAdmin();
    getPredictions();
    getDoctorCount();
    getPredictCount();
  }, []); // This empty array ensures this effect runs only once

  const getAdmin = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profileadmin/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const res = response.data;
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

  const getDoctorCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/countdoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctorCount(response.data.doctor_count);
    } catch (error) {
      console.error("There was an error fetching the doctor count!", error);
    }
  };

  const getPredictCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/countpredics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPredictCount(response.data.predict_count);
    } catch (error) {
      console.error("There was an error fetching the doctor count!", error);
    }
  };

  const getPredictions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/listpredict", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPredictions(response.data);
    } catch (error) {
      console.error("There was an error fetching the predictions data!", error);
    }
  };

  const historyAnalysis = () => {
    navigate("/adminreportanalysislist");
  };

  return (
    <>
      <div>Doctors</div>
      <div>{doctorCount}</div>
      <div>Prediction Tested</div>
      <div>{predictCount}</div>
      {profileData && (
        <div>
          <div>Welcome Back, {profileData.profile_username}</div>
          <Link
            className="btn btn-sm btn-primary"
            to={`/manageprofileadmin/${profileData.profile_id}/edit`}
          >
            Edit Profile
          </Link>
        </div>
      )}
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
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{prediction.fullname}</td>
              <td>{prediction.gender}</td>
              <td>{prediction.age}</td>
              <td
                className={`font-semibold text-${
                  prediction.resultprediction === "Normal"
                    ? "success"
                    : "danger"
                }`}
              >
                {prediction.resultprediction}
              </td>
              <td>
                {moment(prediction.datetimeprediction).format("DD MMM YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-primary" onClick={historyAnalysis}>
        See History Report Analysis
      </button>
    </>
  );
}
