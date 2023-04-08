import React from "react";
import Label from "../Label/Label";

function ButtonType({
  id,
  label,
  labelWidth,
  name,
  type,
  value1,
  fontSize,
  checked,
  onClick,
  onChange,
}) {
  // label width should be in percentages
  // type: radio, checkboxes
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "85%" }}>
      <input
        id={id}
        name={name}
        type={type}
        value={value1}
        checked={checked}
        onClick={onClick}
        onChange={onChange}
        style={{ marginRight: "5px", fontSize: fontSize }}
      />
      <label for={id} labelWidth={labelWidth}>
        {label}
      </label>
    </div>
  );
}

export default ButtonType;
