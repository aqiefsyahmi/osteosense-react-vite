import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDoctorProfile = () => {
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneno: "",
  });

  // Update the inputs state when form fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleReset = () => {
    setInputs({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneno: "",
    });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setInputs((values) => ({
      ...values,
      showPassword: !values.showPassword,
    }));
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPassword = () => {
    setInputs((values) => ({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    }));
  };

  // Submit the form data to the server
  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/signupdoctor", inputs)
      .then(function (response) {
        console.log(response.data);
        alert("Doctor Successfully Registered");
        navigate("/admin");
      })
      .catch(function (error) {
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <>
      <div>
        <div className="font-bold text-3xl">Register Doctor Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <div className="font-bold text-lg">Full Name</div>
              <input
                type="text"
                className="form-control mt-2"
                name="fullname"
                value={inputs.fullname}
                onChange={handleInputChange}
                placeholder="Enter Full Name"
                required
              />
            </div>
            <div>
              <div className="font-bold text-lg">Username</div>
              <input
                type="text"
                className="form-control mt-2"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
                placeholder="Enter Username"
                required
              />
            </div>
            <div>
              <div className="font-bold text-lg">Email</div>
              <input
                type="text"
                className="form-control mt-2"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <div className="font-bold text-lg">Phone No.</div>
              <input
                type="text"
                className="form-control mt-2"
                name="phoneno"
                value={inputs.phoneno}
                onChange={handleInputChange}
                placeholder="Enter Phone No."
                required
              />
            </div>
            <div>
              <div className="font-bold text-lg">Password</div>
              <div className="input-group mb-3">
                <input
                  type={inputs.showPassword ? "text" : "password"}
                  className="form-control mt-2"
                  name="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                  placeholder="**********"
                  required
                />
                <div className="input-group-append mt-2">
                  <span className="input-group-text rounded-none rounded-r-lg">
                    <div
                      className="password-toggle"
                      onClick={handleTogglePassword}
                    >
                      {inputs.showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                        </svg>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Confirm Password</div>
              <div className="input-group mb-3">
                <input
                  type={inputs.showConfirmPassword ? "text" : "password"}
                  className="form-control mt-2"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="**********"
                  required
                />
                <div className="input-group-append mt-2">
                  <span className="input-group-text rounded-none rounded-r-lg">
                    <div
                      className="password-toggle"
                      onClick={handleToggleConfirmPassword}
                    >
                      {inputs.showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                        </svg>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="w-40 btn btn-sm btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="w-40 btn btn-sm btn-outline btn-error"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterDoctorProfile;
