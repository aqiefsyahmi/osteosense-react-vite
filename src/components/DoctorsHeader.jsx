/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import doctoricon from "../image/doctoricon.png";

export default function DoctorsHeader(props) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getUsers();
  }, []); // this Empty array ensures this get effect runs only once

  const email = localStorage.getItem("email");

  const getUsers = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          profile_email: res.email,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then(() => {
        props.removeToken();
        localStorage.removeItem("email");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToPage = (page) => {
    navigate(page);
  };

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div className="w-56 bg-[#4A00FF] text-white border-r-2 divide-y border-[#00000036] shadow-xl">
          <div className="p-4">
            <h1 className="text-2xl font-semibold">OsteoSense</h1>
            <ul className="mt-4">
              <li className="mb-2">
                <button
                  onClick={() => navigateToPage("doctors")}
                  className="block hover:text-indigo-400"
                >
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => navigateToPage("doctors")}
                  className="block hover:text-indigo-400"
                >
                  About
                </button>
              </li>
              <li className="mb-2">
                <a href="#" className="block hover:text-indigo-400">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block hover:text-indigo-400">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => navigateToPage("manageprofileadmin")}
                  className="block hover:text-indigo-400"
                >
                  Edit Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="navbar bg-[#4A00FF]">
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
          {!isSidebarOpen && (
            <div className="flex-1">
              <button className="btn btn-ghost text-white text-lg">
                OsteoSense
              </button>
            </div>
          )}
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle avatar">
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={doctoricon} />
                  </div>
                </div>
              </div>
              {profileData && (
                <ul className="mt-3 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border divide-y">
                  <div className="px-2 py-1">
                    <span className="block text-sm">
                      {profileData.profile_name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400 pb-2">
                      {profileData.profile_email}
                    </span>
                  </div>
                  <div>
                    <div className="text-primary">
                      <li>
                        <button>Profile</button>
                      </li>
                      <li>
                        <button>Settings</button>
                      </li>
                    </div>
                    <li>
                      <button
                        type="submit"
                        className="btn btn-outline btn-sm btn-error"
                        onClick={logMeOut}
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
