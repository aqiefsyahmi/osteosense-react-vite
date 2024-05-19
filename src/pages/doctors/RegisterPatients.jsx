// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationAdmin";

const RegisterPatients = () => {
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Register Patient</h1>
      {/* <div>Upload Photos</div>
      <input id="file-upload" type="file" className="form-control" /> */}
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
      <button className="btn btn-sm btn-primary">Submit and Save</button>
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
};

export default RegisterPatients;
