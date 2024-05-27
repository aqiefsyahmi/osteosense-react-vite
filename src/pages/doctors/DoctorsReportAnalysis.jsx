import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PredictDeleteConfirmation from "../../components/PredictDeleteConfirmation";

const DoctorsReportAnalysis = () => {
  const navigate = useNavigate();
  const [predictlist, setPredictList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [predictToDelete, setPredictToDelete] = useState(null);
  const idtoken = localStorage.getItem("id");

  useEffect(() => {
    getPredict();
  }, []);

  const handlePredictionDetailsClick = (id) => {
    navigate(`/predictlistdetails/${id}/edit`);
  };

  const getPredict = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/listpredict", {
        headers: {
          Authorization: `Bearer ${idtoken}`,
        },
      });
      setPredictList(response.data);
    } catch (error) {
      console.error("There was an error fetching the prediction list!", error);
    }
  };

  const handleDeleteClick = (id) => {
    setPredictToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/predictdelete/${predictToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${idtoken}`,
          },
        }
      );
      getPredict();
      alert("Successfully Deleted");
    } catch (error) {
      console.error("There was an error deleting the prediction!", error);
    }
    setShowModal(false);
  };

  return (
    <>
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
          {predictlist &&
            predictlist.map((predict, key) =>
              predict.doctorid === idtoken ? (
                <tr key={key}>
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
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handlePredictionDetailsClick(predict.id)}
                    >
                      Prediction Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteClick(predict.id)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
      <PredictDeleteConfirmation
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DoctorsReportAnalysis;
