import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DoctorsReportAnalysis = () => {
  const navigate = useNavigate();
  const [predictlist, setPredictList] = useState([]);

  useEffect(() => {
    getPredict();
  }, []);
  const handlePredictionDetailsClick = (id) => {
    navigate(`/predictlistdetails/${id}/edit`);
  };

  function getPredict() {
    axios.get("http://127.0.0.1:5000/listpredict").then(function (response) {
      console.log(response.data);
      setPredictList(response.data);
    });
  }

  return (
    <>
      {/* <Header /> */}
      {/* <Navigation /> */}
      <h1>History Report Analysis</h1>
      <h6>By Dr. Jamaluddin</h6>

      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Prediction</th>
            <th>Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {predictlist.map((predictlist, key) => (
            <tr key={key}>
              <td>{predictlist.fullname}</td>
              <td>{predictlist.gender}</td>
              <td>{predictlist.age}</td>
              <td
                className={`font-semibold text-${
                  predictlist.resultprediction === "Normal"
                    ? "green-500"
                    : "danger"
                }`}
              >
                {predictlist.resultprediction}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handlePredictionDetailsClick(predictlist.id)}
                >
                  Prediction Details
                </button>
              </td>
              <td>
                <button
                  // onClick={() => handleDeleteClick(predictlist.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
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

export default DoctorsReportAnalysis;
