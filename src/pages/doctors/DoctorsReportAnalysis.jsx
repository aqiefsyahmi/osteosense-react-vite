// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationDoctors";

import { useNavigate } from "react-router-dom";

const DoctorsReportAnalysis = () => {
  const navigate = useNavigate();

  const viewmore = () => {
    navigate("/doctorsreportanalysisdetails");
  };
  return (
    <>
      {/* <Header /> */}
      {/* <Navigation /> */}
      <h1>History Report Analysis</h1>
      <h6>By Dr. Jamaluddin</h6>

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
          <tr>
            <td>1</td>
            <td>Ahmad Farhan</td>
            <td>Normal</td>
            <td>
              <button className="btn btn-sm btn-primary" onClick={viewmore}>
                View More
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

export default DoctorsReportAnalysis;
