import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  // Initialize the navigate function for routing
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [inputs, setInputs] = useState([]);

  // Update the inputs state when form fields change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Submit the form data to the server
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/useradd", inputs)
      .then(function (response) {
        console.log(response.data);
        // Navigate to the "/test" route after successful user creation
        navigate("/test");
      });
  };

  // Render the form for creating a new user
  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>CreateUser</h1>
            <form onSubmit={handleSubmit}>
              {/* Input field for user name */}
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              {/* Input field for user email */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              {/* Button to submit the form */}
              <button type="submit" name="add" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}
