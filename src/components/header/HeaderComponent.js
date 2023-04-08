import React from "react";

function HeaderComponent({
  icon,
  title,
  height,
  backgroundColor,
  color,
  fontSize,
}) {
  return (
    <div>
      <div
        style={{
          height: height,
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "5px",
          color: color,
          backgroundColor: backgroundColor,
          fontSize: fontSize,
          // textTransform: "uppercase",
          borderRadius: "2px",
          fontWeight: "700",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <div
          style={{
            marginRight: "10px",
            marginBottom: "5px",
            marginLeft: "5px",
          }}
        >
          {icon}
        </div>
        {title}
      </div>
    </div>
  );
}

export default HeaderComponent;
