import { useState } from "react";
import loginPageImage from "../image/loginpage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (event) => {
    const url = isAdmin
      ? "http://127.0.0.1:5000/logintokenadmin"
      : "http://127.0.0.1:5000/logintokendoctors";

    axios
      .post(url, {
        email: loginForm.email,
        password: loginForm.password,
      })
      .then((response) => {
        handleLogin(response, isAdmin);
        navigate(isAdmin ? "/admin" : "/doctors");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        }
      });

    event.preventDefault();
  };

  return (
    <div className="h-screen grid md:grid-cols-2 sm:grid-cols-1">
      <div className="content-center mt-5 mb-5">
        <div className="grid place-content-center pb-[70px]">
          <span className="text-[#4A00FF] text-4xl font-bold">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              OsteoSense!
            </span>
          </span>
        </div>
        <div>
          <img
            src={loginPageImage}
            className="grid place-content-center w-[30rem] mx-auto img-fluid"
            alt="Login Page"
          />
        </div>
        <div className="grid place-content-center pt-[70px] mb-2">
          <span className="text-[#4A00FF] font-normal text-sm">
            Copyright © 2024, OsteoSense Web Project. All rights reserved.
          </span>
        </div>
      </div>

      <div className="bg-[#4A00FF] content-center">
        <div className="mt-5 mb-5">
          <div className="grid place-content-center h-20">
            <span className="text-base-100 text-4xl pb-5 fw-bold">
              {isAdmin ? "Sign In Admin" : "Sign In Doctor"}
            </span>
          </div>
          <div className="mx-auto bg-[#FFFFFF] w-3/5 px-5 py-5 shadow-2xl rounded-[1.7rem]">
            <form onSubmit={handleLoginSubmit}>
              <div className="pb-2">
                <label
                  className="form-label text-[#4A00FF] font-bold text-xl"
                  htmlFor="form3Example3"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={handleChange}
                  name="email"
                  id="form3Example3"
                  className="form-control max-w-full input-lg"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="pb-4">
                <label
                  className="form-label text-[#4A00FF] font-bold text-xl"
                  htmlFor="form3Example4"
                >
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={handleChange}
                    name="password"
                    id="form3Example4"
                    className="form-control max-w-full input-lg"
                    placeholder="**********"
                  />
                  <div className="input-group-append-login">
                    <span className="input-group-text rounded-none rounded-r-lg">
                      <div
                        className="password-toggle"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="44px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#666666"
                          >
                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="44px"
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
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full rounded-xl"
                >
                  {isAdmin ? "Sign in" : "Sign in"}
                </button>
                <div className="grid place-content-center pt-4">
                  <button
                    type="button"
                    className="link link-secondary font-medium"
                    onClick={() => setIsAdmin(!isAdmin)}
                  >
                    {isAdmin ? "Are you a doctor?" : "Are you an admin?"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
