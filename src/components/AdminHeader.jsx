/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import adminicon from "../image/adminicon.png";
import myOsteosensesLogoWhite from "../image/myOsteosensesLogoWhite.png";

export default function AdminHeader(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    getAdmins();
  }, [location]); // this Empty array ensures this get effect runs only once

  const getAdmins = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await axios({
        method: "GET",
        url: `http://127.0.0.1:5000/profileadmin/${id}`,
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      console.log(response);
      const res = response.data;
      res.access_token && props.setToken(res.access_token);
      setProfileData({
        profile_id: res.id,
        profile_username: res.username,
        profile_email: res.email,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logoutadmin",
    })
      .then(() => {
        props.removeToken(); // Corrected function call to remove the token
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
      <div
        className={`flex fixed h-full w-64 bg-[#4A00FF] text-white border-r-2 divide-y border-[#00000036] shadow-xl  flex-col ${
          isSidebarOpen ? "slideInLeft" : "slideOutLeft"
        } duration-300`}
      >
        {isSidebarOpen && (
          <div className="fixed h-full w-64 bg-[#4A00FF] text-white border-r-2 divide-y border-[#00000036] shadow-xl flex flex-col">
            <div className="p-4 flex-grow overflow-y-auto">
              {/* <div className="flex items-center pt-8"> 
               <div className="w-10 rounded-full">
                <img src={myOsteosensesLogoWhite} alt="OsteoSense Logo" />
              </div>
              <div className="text-2xl font-semibold ml-3">OsteoSense</div> 
             </div> */}
              <ul className="menu mt-10">
                <li
                  className={`mb-2 ${
                    activeMenu === "dashboard" ? "active" : ""
                  }`}
                >
                  <div
                    onClick={() => {
                      navigateToPage("admin");
                      setActiveMenu("dashboard");
                    }}
                    className={`hover:text-indigo-400 ${
                      activeMenu !== "dashboard" ? "default-class" : ""
                    }`} // Apply default class if not active
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill={activeMenu === "dashboard" ? "#4A00FF" : "#ffffff"}
                    >
                      <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
                    </svg>
                    Dashboard
                  </div>
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
                        <li
                          className={`mb-2 ${
                            activeMenu === "myprofile" ? "active" : ""
                          }`}
                        >
                          <div
                            onClick={() => {
                              navigateToPage(
                                `/manageprofileadmin/${profileData.profile_id}/edit`
                              );
                              setActiveMenu("myprofile");
                            }}
                            className={"hover:text-indigo-400"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill={
                                activeMenu === "myprofile"
                                  ? "#4A00FF"
                                  : "#FFFFFF"
                              }
                            >
                              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                            </svg>
                            My Profile
                          </div>
                        </li>
                      )}
                      <li
                        className={`mb-2 ${
                          activeMenu === "registerdoctor" ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            navigateToPage("/registerdoctorprofile");
                            setActiveMenu("registerdoctor");
                          }}
                          className={`hover:text-indigo-400 ${
                            activeMenu !== "registerdoctor"
                              ? "default-class"
                              : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={
                              activeMenu === "registerdoctor"
                                ? "#4A00FF"
                                : "#ffffff"
                            }
                          >
                            <path d="M500-482q29-32 44.5-73t15.5-85q0-44-15.5-85T500-798q60 8 100 53t40 105q0 60-40 105t-100 53Zm220 322v-120q0-36-16-68.5T662-406q51 18 94.5 46.5T800-280v120h-80Zm80-280v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Zm-480-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM0-160v-112q0-34 17.5-62.5T64-378q62-31 126-46.5T320-440q66 0 130 15.5T576-378q29 15 46.5 43.5T640-272v112H0Zm320-400q33 0 56.5-23.5T400-640q0-33-23.5-56.5T320-720q-33 0-56.5 23.5T240-640q0 33 23.5 56.5T320-560ZM80-240h480v-32q0-11-5.5-20T540-306q-54-27-109-40.5T320-360q-56 0-111 13.5T100-306q-9 5-14.5 14T80-272v32Zm240-400Zm0 400Z" />
                          </svg>
                          Register Doctor Profile
                        </div>
                      </li>
                      <li
                        className={`mb-2 ${
                          activeMenu === "admineditdoctors" ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            navigateToPage("/admineditdoctors");
                            setActiveMenu("admineditdoctors");
                          }}
                          className="hover:text-indigo-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={
                              activeMenu === "admineditdoctors"
                                ? "#4A00FF"
                                : "#ffffff"
                            }
                          >
                            <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM440-160q-17 0-28.5-11.5T400-200v-36q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v36q0 17-11.5 28.5T840-160H440Zm46-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM400-400H160q-17 0-28.5-11.5T120-440q0-17 11.5-28.5T160-480h240q17 0 28.5 11.5T440-440q0 17-11.5 28.5T400-400Zm160-320H160q-17 0-28.5-11.5T120-760q0-17 11.5-28.5T160-800h400q17 0 28.5 11.5T600-760q0 17-11.5 28.5T560-720ZM444-560H160q-17 0-28.5-11.5T120-600q0-17 11.5-28.5T160-640h320q-14 17-22.5 37T444-560Z" />
                          </svg>
                          Doctor Profiles
                        </div>
                      </li>
                      <li
                        className={`mb-2 ${
                          activeMenu === "viewpatientlist" ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            navigateToPage("/viewpatientlist");
                            setActiveMenu("viewpatientlist");
                          }}
                          className="hover:text-indigo-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={
                              activeMenu === "viewpatientlist"
                                ? "#4A00FF"
                                : "#ffffff"
                            }
                          >
                            <path d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM440-160q-17 0-28.5-11.5T400-200v-36q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v36q0 17-11.5 28.5T840-160H440Zm46-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM400-400H160q-17 0-28.5-11.5T120-440q0-17 11.5-28.5T160-480h240q17 0 28.5 11.5T440-440q0 17-11.5 28.5T400-400Zm160-320H160q-17 0-28.5-11.5T120-760q0-17 11.5-28.5T160-800h400q17 0 28.5 11.5T600-760q0 17-11.5 28.5T560-720ZM444-560H160q-17 0-28.5-11.5T120-600q0-17 11.5-28.5T160-640h320q-14 17-22.5 37T444-560Z" />
                          </svg>
                          Patient Profiles
                        </div>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details open>
                    <summary>
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
                    </summary>
                    <ul>
                      <li
                        className={`mb-2 ${
                          activeMenu === "adminreportanalysislist"
                            ? "active"
                            : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            navigateToPage("/adminreportanalysislist");
                            setActiveMenu("adminreportanalysislist");
                          }}
                          className="hover:text-indigo-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={
                              activeMenu === "adminreportanalysislist"
                                ? "#4A00FF"
                                : "#ffffff"
                            }
                          >
                            <path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z" />
                          </svg>
                          Doctor Lists
                        </div>
                      </li>
                      <li
                        className={`mb-2 ${
                          activeMenu === "allanalysislists" ? "active" : ""
                        }`}
                      >
                        <div
                          onClick={() => {
                            navigateToPage("/allanalysislists");
                            setActiveMenu("allanalysislists");
                          }}
                          className="hover:text-indigo-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={
                              activeMenu === "allanalysislists"
                                ? "#4A00FF"
                                : "#ffffff"
                            }
                          >
                            <path d="M80-160v-280h360v280H80Zm0-360v-280h360v280H80Zm80-80h200v-120H160v120Zm560 440L520-360l56-56 104 103v-487h80v487l104-103 56 56-200 200Z" />
                          </svg>
                          All Lists
                        </div>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
            <div
              className="btn btn-primary mb-2 flex mx-8 hover:text-indigo-400 rounded-lg gap-2"
              onClick={logMeOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
              Logout
            </div>
          </div>
        )}
      </div>
      <div className={`flex-grow ${isSidebarOpen ? "ml-64" : ""} duration-300`}>
        <div className="navbar bg-[#4A00FF] fixed top-0 left-0 w-full z-10">
          <div className="flex">
            <div
              onClick={toggleSidebar}
              className="btn btn-primary  rounded-md bg-[#4A00FF] text-white"
            >
              <div className="flex flex-col">
                {isSidebarOpen ? (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                    <div className="text-normal ml-2 font-normal">Close</div>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
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
                )}
              </div>
            </div>
          </div>
          {!isSidebarOpen && (
            <div className="flex-1 flex">
              <button
                className="btn btn-ghost text-white text-lg"
                onClick={() => navigateToPage("admin")}
              >
                <div className="w-8 rounded-full">
                  <img src={myOsteosensesLogoWhite} alt="OsteoSense Logo" />
                </div>
                OsteoSense
              </button>
            </div>
          )}
          <div className="flex-none ">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle avatar">
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src={adminicon} />
                  </div>
                </div>
              </div>
              <ul className="mt-3 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border divide-y">
                {profileData && (
                  <div className="px-2 py-1">
                    <span className="block text-sm font-semibold">
                      {profileData.profile_username}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400 pb-2">
                      {profileData.profile_email}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-primary">
                    {profileData && (
                      <li className="py-1">
                        <Link
                          className="text-[#4A00FF]"
                          to={`/manageprofileadmin/${profileData.profile_id}/edit`}
                        >
                          Edit Profile
                          <div className="flex justify-end">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="20px"
                              viewBox="0 -960 960 960"
                              width="20px"
                              fill="#4A00FF"
                            >
                              <path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z" />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    )}
                  </div>
                  <li className="py-1">
                    <button
                      type="submit"
                      className="text-[#FF5861]"
                      onClick={logMeOut}
                    >
                      Logout
                      <div className="flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#FF5861"
                        >
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                        </svg>
                      </div>
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="flex-1 overflow-auto p-4 mt-16"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
