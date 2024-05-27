import { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmation from "../../components/DeleteConfirmation";

import { Link } from "react-router-dom";

const PatientList = () => {
  const [patient, setPatient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);

  useEffect(() => {
    getPatient();
  }, []);

  function getPatient() {
    axios.get("http://127.0.0.1:5000/listpatients").then(function (response) {
      console.log(response.data);
      setPatient(response.data);
    });
  }

  const handleDeleteClick = (id) => {
    setPatientIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/patientdelete/${patientIdToDelete}`)
      .then((response) => {
        console.log(response.data);
        // Refresh the list of users after deletion
        getPatient();
      })
      .catch((error) => {
        console.error("There was an error deleting the doctor!", error);
      });
    setShowModal(false);
    alert("Successfully Deleted");
  };

  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Edit Patient Profile</h1>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>Patient Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patient.map((patient, key) => (
            <tr key={key}>
              <td>{patient.fullname}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.email}</td>
              <td>{patient.phoneno}</td>
              <td>
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/patientupdate/${patient.id}/edit`}
                >
                  Update Info
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(patient.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmation
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default PatientList;
