/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
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
          profile_id: res.id,
          profile_fullname: res.fullname,
          profile_username: res.username,
          profile_email: res.email,
          profile_phoneno: res.phoneno,
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
        localStorage.removeItem("id");
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
        <div className="w-64 bg-[#4A00FF] text-white border-r-2 divide-y border-[#00000036] shadow-xl">
          <div className="p-4">
            <h1 className="grid place-content-center text-2xl font-semibold">
              OsteoSense
            </h1>
            <ul className="menu">
              <li className="mb-2">
                <button
                  onClick={() => navigateToPage("doctors")}
                  className="hover:text-indigo-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
                  </svg>
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <details open>
                  <summary>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-240v-32q0-33 17-62t47-44q58-29 120-45.5T391-440q17 0 28.5 12t11.5 29q0 17-11.5 28.5T391-359q-56 0-108.5 14T180-306q-10 5-15 14t-5 20v32h231q17 0 28.5 11.5T431-200q0 17-11.5 28.5T391-160H160q-33 0-56.5-23.5T80-240Zm554 88-6-28q-12-5-22.5-10.5T584-204l-29 9q-13 4-25.5-1T510-212l-8-14q-7-12-5-26t13-23l22-19q-2-14-2-26t2-26l-22-19q-11-9-13-22.5t5-25.5l9-15q7-11 19-16t25-1l29 9q11-8 21.5-13.5T628-460l6-29q3-14 13.5-22.5T672-520h16q14 0 24.5 9t13.5 23l6 28q12 5 22.5 11t21.5 15l27-9q14-5 27 0t20 17l8 14q7 12 5 26t-13 23l-22 19q2 12 2 25t-2 25l22 19q11 9 13 22.5t-5 25.5l-9 15q-7 11-19 16t-25 1l-29-9q-11 8-21.5 13.5T732-180l-6 29q-3 14-13.5 22.5T688-120h-16q-14 0-24.5-9T634-152Zm46-88q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
                    </svg>
                    Manage Profile
                  </summary>
                  <ul>
                    {profileData && (
                      <li className="mb-2">
                        <Link
                          to={`/manageprofiledoctors/${profileData.profile_id}/edit`}
                          className="hover:text-indigo-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#FFFFFF"
                          >
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                          </svg>
                          My Profile
                        </Link>
                      </li>
                    )}
                    <li className="mb-2">
                      <button
                        onClick={() => navigateToPage("registerpatients")}
                        className="hover:text-indigo-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                        </svg>
                        Register Patient
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => navigateToPage("patientlist")}
                        className="hover:text-indigo-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM440-160q-17 0-28.5-11.5T400-200v-36q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v36q0 17-11.5 28.5T840-160H440Zm46-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM400-400H160q-17 0-28.5-11.5T120-440q0-17 11.5-28.5T160-480h240q17 0 28.5 11.5T440-440q0 17-11.5 28.5T400-400Zm160-320H160q-17 0-28.5-11.5T120-760q0-17 11.5-28.5T160-800h400q17 0 28.5 11.5T600-760q0 17-11.5 28.5T560-720ZM444-560H160q-17 0-28.5-11.5T120-600q0-17 11.5-28.5T160-640h320q-14 17-22.5 37T444-560Z" />
                        </svg>
                        Patients Profile
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
              <li className="mb-2">
                <details open>
                  <summary>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M411-338Zm495 67-195-64 26-77 195 65-26 76Zm14-169H735v-80h185v80Zm11-175-196 66-24-77 196-65 24 76ZM285-400q-52 0-88.5-36.5T160-525q0-26 10-48.5t27-39.5l83-84v-183h80v200q0 8-3.5 15.5T348-651l-95 95q-6 6-9.5 14t-3.5 17q0 18 13.5 31.5T285-480q12 0 19-4t19-14q22-18 43.5-27t43.5-9q22 0 43.5 9t43.5 27q12 10 19 14t19 4q19 0 32-13.5t13-31.5q0-9-3.5-17.5T567-557l-95-95q-5-6-8.5-13t-3.5-15v-200h80v182l84 84q17 17 26.5 40t9.5 49q0 52-36 88.5T535-400q-33 0-53.5-12.5T447-437q-15-12-23.5-14.5T410-454q-9 0-18.5 6T374-437q-14 12-34.5 24.5T285-400ZM460-80v-190q0-8 3.5-15.5T472-299l95-95q6-6 9.5-14t3.5-17q0-10-3.5-18t-9.5-14l57-57q17 17 26.5 40t9.5 49q0 26-9.5 48T624-338l-84 84v174h-80Zm-180 0v-174l-83-84q-17-17-27-39t-10-48q0-26 10-49t27-40l57 57q-7 6-10.5 14t-3.5 18q0 9 3.5 17t9.5 14l95 95q5 6 8.5 13.5T360-270v190h-80Zm130-572Z" />
                    </svg>
                    Analysis
                  </summary>
                  <ul>
                    <li className="mb-2">
                      <button
                        onClick={() => navigateToPage("imageprediction")}
                        className="hover:text-indigo-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200v80H200v560h560v-214l80 80v134q0 33-23.5 56.5T760-120H200Zm40-160 120-160 90 120 120-160 150 200H240Zm622-144L738-548q-21 14-45 21t-51 7q-74 0-126-52.5T464-700q0-75 52.5-127.5T644-880q75 0 127.5 52.5T824-700q0 27-8 52t-20 46l122 122-56 56ZM644-600q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
                        </svg>
                        Image Disease Prediction
                      </button>
                    </li>
                    <li className="mb-2">
                      <button
                        onClick={() => navigateToPage("doctorsreportanalysis")}
                        className="hover:text-indigo-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M480-120q-126 0-223-76.5T131-392q-4-15 6-27.5t27-14.5q16-2 29 6t18 24q24 90 99 147t170 57q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h70q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560H160q-17 0-28.5-11.5T120-600v-160q0-17 11.5-28.5T160-800q17 0 28.5 11.5T200-760v54q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z" />
                        </svg>
                        History Analysis
                      </button>
                    </li>
                  </ul>
                </details>
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
              <button
                className="btn btn-ghost text-white text-lg"
                onClick={() => navigateToPage("doctors")}
              >
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
                    <span className="block text-sm font-semibold">
                      {profileData.profile_fullname}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400 pb-2">
                      {profileData.profile_email}
                    </span>
                  </div>
                  <div>
                    <div className="text-primary">
                      <li>
                        <button onClick={() => navigateToPage("doctors")}>
                          Home Page
                        </button>
                      </li>
                      {profileData && (
                        <li>
                          <Link
                            to={`/manageprofiledoctors/${profileData.profile_id}/edit`}
                          >
                            Edit Profile
                          </Link>
                        </li>
                      )}
                    </div>
                    <li>
                      <button
                        type="submit"
                        className="btn btn-outline btn-sm btn-error btn-hover-white"
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
