import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

function ButtonComponent({label,buttonBackgroundColor, buttonColor, buttonWidth, buttonHeight, onClick}) {
    // height should be in percentages and width should be in pixels
    const navigate = useNavigate();

    const navigateToLoan = () => {
      // 👇️ navigate to /contacts
      navigate("/Loan");
    };
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate("/fid");
    };
  return (
    <button
    onClick={onClick}
      className="button"
      style={{
        backgroundColor: buttonBackgroundColor,
        color: buttonColor,
        border: "none",
        borderRadius: "4px",
        height: buttonHeight,
        width: buttonWidth,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

export default ButtonComponent;
