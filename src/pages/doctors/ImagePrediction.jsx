// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationDoctors";

export default function ImagePrediction() {
  return (
    <>
      {/* <Header />
        <Navigation /> */}
      <h1>Image Prediction</h1>
      <div>Upload Photos</div>
      <input id="file-upload" type="file" className="form-control" />
      <div>Search Patient</div>
      <div className="pt-1 pb-2">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <button className="btn btn-sm btn-primary">Submit and Save</button>
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
}
