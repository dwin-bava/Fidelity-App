import React, { useState } from "react";

function ButtonComponent({
  label,
  buttonIcon,
  buttonBackgroundColor,
  buttonColor,
  buttonWidth,
  margin,
  buttonHeight,
  onClick,
  marginBottom,
  type,
}) {
  const [isPEP, setIsPEP] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // height should be in percentages and width should be in pixels
  const [getButtonColor, setButtonColor] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  return (
    <button
      className="button"
      onClick={onClick}
      type={type}
      style={{
        // backgroundColor: buttonBackgroundColor,

        // background:
        //   `url(` +
        //   window.location.origin +
        //   `/assets/images/headerBackground/` +
        //   getButtonColor.theme.headerImage +
        //   `)`,
        color: buttonColor,
        border: "none",
        borderRadius: "4px",
        height: buttonHeight,
        width: buttonWidth,
        marginBottom: marginBottom,
        whiteSpace: "nowrap",
        padding: "0px 5px",
        margin: margin,
        fontSize: "12px",
      }}
    >
      {buttonIcon}
      {label}
    </button>
  );
}

export default ButtonComponent;
