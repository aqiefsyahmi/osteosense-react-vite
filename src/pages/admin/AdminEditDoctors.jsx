import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationAdmin";
import axios from "axios";

// import api from "../api";

import { Link } from "react-router-dom";

const AdminEditDoctors = () => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    getDoctor();
  }, []);

  function getDoctor() {
    axios.get("http://127.0.0.1:5000/listdoctors").then(function (response) {
      console.log(response.data);
      setDoctor(response.data);
    });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/doctordelete/${id}`)
      .then(function (response) {
        console.log(response.data);
        // Refresh the list of users after deletion
        getDoctor();
      });
    alert("Successfully Deleted");
  };

  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Edit Doctor Profile</h1>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone No.</th>
            <th>Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over transactions and display them in the table */}
          {doctor.map((doctor, key) => (
            <tr key={key}>
              <td>{doctor.username}</td>
              <td>{doctor.email}</td>
              <td>{doctor.fullname}</td>
              <td>{doctor.phoneno}</td>
              <td>
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/doctor/${doctor.id}/edit`}
                >
                  Update Info
                </Link>
              </td>
              <td>
                <button
                  onClick={() => deleteUser(doctor.id)}
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

export default AdminEditDoctors;
