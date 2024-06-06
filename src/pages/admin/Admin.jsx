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
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    getAdmin();
    getPredictions();
    getDoctorCount();
    getPredictCount();
    getPatientCount();
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

  const getPatientCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/countpatients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientCount(response.data.patient_count);
    } catch (error) {
      console.error("There was an error fetching the patient count!", error);
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
      <div className="font-bold text-3xl">Overview</div>
      <div className="font-bold text-gray-500 text-2xl">Total Doctors</div>
      <div className="font-black text-2xl">{doctorCount}</div>
      <div className="font-bold text-gray-500 text-2xl">Total Patients</div>
      <div className="font-black text-2xl">{patientCount}</div>
      <div className="font-bold text-gray-500 text-2xl">Tested Predictions</div>
      <div className="font-black text-2xl">{predictCount}</div>
      <div className="font-bold text-gray-500 text-2xl">
        History Report Analysis
      </div>
      <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem]">
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
      </div>
    </>
  );
}
