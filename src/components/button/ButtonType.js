import React from "react";
import Label from "../label/Label";

function ButtonType({ label, labelWidth, type }) {
  // label width should be in percentages
  // type: radio, checkboxes
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input type={type} style={{ marginRight: "5px" }} />
      <Label label={label} labelWidth={labelWidth} />
    </div>
  );
}

export default ButtonType;
