import React, { useState, useEffect, useRef } from "react";

const GenderDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedGender, setSelectedGender] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (gender) => {
    setSelectedGender(gender);
    onChange({ target: { name: "gender", value: gender } });
    setIsOpen(false);
    setIsActive(false);
  };

  return (
    <div className="mt-3 relative inline-block w-full" ref={dropdownRef}>
      <button
        type="button"
        className="text-left flex justify-between items-center"
        style={{
          backgroundColor: "#ececec",
          border: `0px solid ${isActive ? "#c2dbfe" : "#ced4da"}`,
          borderRadius: "9px",
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          color: "#495057",
          outline: "none",
          boxShadow: isActive ? "0 0 0 0.25rem rgba(194, 219, 254)" : "none",
          transition:
            "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsActive(!isActive);
        }}
      >
        <span style={{ color: selectedGender ? "#495057" : "#6C758F" }}>
          {selectedGender
            ? selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
            : "Select Gender"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#666666"
          className={`transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box absolute mt-2 left-0 w-full"
          role="menu"
          style={{
            maxWidth: "100%",
            transition: "background-color 0.2s ease-in-out", // Smooth transition for background color
            backgroundColor: isActive ? "#ececec" : "#fff", // Change background color based on isActive state
            color: isActive ? "#333" : "#495057", // Change text color based on isActive state
            border: "1px solid #dfdede",
          }}
        >
          <li>
            <button
              className="text-base"
              onClick={() => handleOptionClick("male")}
            >
              Male
            </button>
          </li>
          <li>
            <button
              className="text-base"
              onClick={() => handleOptionClick("female")}
            >
              Female
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default GenderDropdown;
