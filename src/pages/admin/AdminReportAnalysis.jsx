import { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const AdminReportAnalysis = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const [predictData, setPredictData] = useState(null);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    if (doctorId) {
      getPredictionsForDoctor(doctorId);
      getDoctors(); // Fetch doctor's full name when doctorId changes
    }
  }, [doctorId]);

  const handlePredictionDetailsClick = (id) => {
    navigate(`/adminpredictlistdetails/${id}/edit`);
  };

  const getDoctors = () => {
    axios
      .get("http://127.0.0.1:5000/listdoctors")
      .then(function (response) {
        // Assuming the response contains an array of doctors
        // Find the doctor with the corresponding doctorId
        const doctor = response.data.find((doc) => doc.id === doctorId);
        if (doctor) {
          setDoctorName(doctor.fullname);
        }
      })
      .catch(function (error) {
        console.error("Error fetching doctors:", error);
      });
  };

  const getPredictionsForDoctor = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/listpredict/${doctorId}`
      );
      setPredictData(response.data);
    } catch (error) {
      console.error("There was an error fetching the patient details!", error);
    }
  };

  return (
    <>
      <h1>History Report Analysis</h1>
      <h6>By {doctorName}</h6>

      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Result</th>
            <th>More Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {predictData &&
            predictData.map((predict, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{predict.fullname}</td>
                <td
                  className={`font-semibold text-${
                    predict.resultprediction === "Normal" ? "success" : "danger"
                  }`}
                >
                  {predict.resultprediction}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handlePredictionDetailsClick(predict.id)}
                  >
                    Prediction Details
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminReportAnalysis;
