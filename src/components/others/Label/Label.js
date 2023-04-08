import React from "react";

function Label({ label, required, labelWidth, fontSize, fontWeight, color, id }) {
  // label width should be in percentages
  return (
    <label
      for={id}
      style={{
        color: "rgb(92, 92, 92)",
        width: labelWidth,
        // color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
    >
      {label}
      {required ? <span style={{ color: "red" }}> *</span> : null}
    </label>
  );
}

export default Label;
