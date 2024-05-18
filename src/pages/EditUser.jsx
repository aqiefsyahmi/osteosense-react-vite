import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  // Initialize the navigate function for routing
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [inputs, setInputs] = useState([]);

  // Get the user ID from the route parameters
  const { id } = useParams();

  // Fetch user details from the server when the component mounts
  useEffect(() => {
    getUser();
  }, []);

  // Function to fetch user details from the server
  function getUser() {
    axios
      .get(`http://127.0.0.1:5000/userdetails/${id}`)
      .then(function (response) {
        console.log(response.data);
        // Set the form inputs to the fetched user details
        setInputs(response.data);
      });
  }

  // Update the inputs state when form fields change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Submit the form data to update the user
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://127.0.0.1:5000/userupdate/${id}`, inputs)
      .then(function (response) {
        console.log(response.data);
        // Navigate to the "/test" route after successful user update
        navigate("/test");
      });
  };

  // Render the form for editing the user
  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
              {/* Input field for user name */}
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  value={inputs.name}
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
                  value={inputs.email}
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              {/* Button to submit the form */}
              <button type="submit" name="update" className="btn btn-primary">
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
