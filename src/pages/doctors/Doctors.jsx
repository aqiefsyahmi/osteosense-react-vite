import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment-timezone";

export default function Doctors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [profileData, setProfileData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    getUsers();
  }, []); // This empty array ensures this effect runs only once

  useEffect(() => {
    if (profileData) {
      getAnalysis();
    }
  }, [profileData]); // Fetch analysis data only after profileData is set

  const getUsers = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const res = response.data;
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
      const filteredData = response.data.filter(
        (predict) => predict.doctorid === profileData.profile_id
      );
      setAnalysisData(filteredData);
    } catch (error) {
      console.error("There was an error fetching the analysis data!", error);
    }
  };

  const registerPatient = () => {
    navigate("/imageprediction");
  };

  const doctorsReportAnalysis = () => {
    navigate("/doctorsreportanalysis");
  };

  return (
    <>
      <div className="font-bold text-3xl">Overview</div>
      {profileData && (
        <div className="row g-0">
          <div className="font-semibold text-xl">
            Welcome Back,{" "}
            <span className="font-bold">{profileData.profile_fullname}</span>
          </div>
          <Link
            to={`/manageprofiledoctors/${profileData.profile_id}/edit`}
            className="btn btn-sm btn-primary"
          >
            Edit Profile
          </Link>
          <div className="font-semibold text-xl">Upload Bone Image</div>
          <button className="btn btn-sm btn-primary" onClick={registerPatient}>
            Click Here Upload Image
          </button>
        </div>
      )}
      <div className="font-bold text-gray-500 text-2xl">
        History Report Analysis
      </div>
      <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem]">
        {analysisData && (
          <>
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
          onClick={doctorsReportAnalysis}
        >
          See History Report Analysis
        </button>
      </div>
    </>
  );
}
