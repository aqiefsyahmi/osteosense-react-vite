import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationAdmin";
import axios from "axios";
import DeleteConfirmation from "../../components/DeleteConfirmation";

// import api from "../api";

import { Link, useNavigate } from "react-router-dom";

const AdminEditDoctors = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [doctorIdToDelete, setDoctorIdToDelete] = useState(null);

  useEffect(() => {
    getDoctor();
  }, []);

  function getDoctor() {
    axios.get("http://127.0.0.1:5000/listdoctors").then(function (response) {
      console.log(response.data);
      setDoctor(response.data);
    });
  }

  const handleDeleteClick = (id) => {
    setDoctorIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/doctordelete/${doctorIdToDelete}`)
      .then((response) => {
        console.log(response.data);
        // Refresh the list of users after deletion
        getDoctor();
      })
      .catch((error) => {
        console.error("There was an error deleting the doctor!", error);
      });
    setShowModal(false);
    alert("Successfully Deleted");
  };

  const adddoctor = () => {
    navigate("/registerdoctorprofile");
  };

  return (
    <>
      <div className="grid grid-cols-2 mb-3">
        <div className="grid place-content-center justify-start font-bold text-3xl">
          Doctors Profile
        </div>
        <div className="flex justify-end">
          <button
            className="w-40 btn btn-primary icon-button"
            onClick={adddoctor}
          >
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#D1DBFF"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>
      <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem]">
        <table className="table table-striped table-border table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Phone No.</th>
              <th>Information</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {/* Map over transactions and display them in the table */}
            {doctor.map((doctor, key) => (
              <tr key={key}>
                <td>{key + 1}.</td>
                <td>{doctor.username}</td>
                <td>{doctor.email}</td>
                <td>{doctor.fullname}</td>
                <td>{doctor.phoneno}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-primary"
                    to={`/admineditdoctor/${doctor.id}/edit`}
                  >
                    Update Info
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(doctor.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmation
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AdminEditDoctors;
