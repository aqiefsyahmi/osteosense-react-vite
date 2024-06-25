/* eslint-disable react/prop-types */
import { useState } from "react";

const ItemsPerPageDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-left flex justify-between items-center"
        style={{
          backgroundColor: "#ececec",
          border: `0px solid ${isOpen ? "#c2dbfe" : "#ced4da"}`,
          borderRadius: "9px",
          padding: "10px",
          fontSize: "1rem",
          color: "#495057",
          outline: "none",
          boxShadow: isOpen ? "0 0 0 0.25rem rgba(194, 219, 254)" : "none",
          transition:
            "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value === options[options.length - 1] ? "All" : value}</span>
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
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-[#ececec] rounded-box absolute mt-2 left-0">
          {options.map((option) => (
            <li key={option}>
              <button
                className="text-base"
                onClick={() => handleOptionClick(option)}
              >
                {option === options[options.length - 1] ? "All" : option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemsPerPageDropdown;
