// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationDoctors";

import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();

  const editprofile = () => {
    navigate("/manageprofilepatients");
  };
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Edit Patient Profile</h1>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ahmad Farhan</td>
            <td>50</td>
            <td>
              <button className="btn btn-sm btn-primary" onClick={editprofile}>
                Edit Profile
              </button>
            </td>
            <td>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PatientList;
