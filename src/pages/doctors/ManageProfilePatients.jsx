// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationDoctors";

const ManageProfilePatients = () => {
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Detail Patient Profile</h1>
      <div>Patient Name</div>
      <input type="text" className="form-control" />
      <div>Age</div>
      <input type="text" className="form-control" />
      <div>Gender</div>
      <input type="text" className="form-control" />
      <div>Email</div>
      <input type="text" className="form-control" />
      <div>phoneNo</div>
      <input type="text" className="form-control" />
      <button className="btn btn-sm btn-primary">Update</button>
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
};

export default ManageProfilePatients;
