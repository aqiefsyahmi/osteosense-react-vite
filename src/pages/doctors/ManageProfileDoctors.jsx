// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationDoctors";

const ManageProfileDoctors = () => {
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>My Profile</h1>
      <div>Full Name</div>
      <input type="text" className="form-control" />
      <div>Username</div>
      <input type="text" className="form-control" />
      <div>Email</div>
      <input type="text" className="form-control" />
      <div>Password</div>
      <input type="text" className="form-control" />
      <div>Confirm Password</div>
      <input type="text" className="form-control" />
      <div>Phone No.</div>
      <input type="text" className="form-control" />
      <button className="btn btn-sm btn-primary">Save</button>
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
};

export default ManageProfileDoctors;
