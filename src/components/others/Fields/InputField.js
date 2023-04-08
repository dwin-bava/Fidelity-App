import React from "react";
// import { IoCalendarOutline } from "react-icons/io5";
// import { DatePicker } from "antd";
import "./index.css";

function InputField({
  labelWidth,
  inputWidth,
  type,
  label,
  maxLength,
  disabled,
  required,
  value,
  marginBottom,
  labelColor,
  paddingRight,
  margin,
  textAlign,
  onChange
}) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      // className="w-full flex items-center"
      style={{
        // display: "flex",
        // alignItems: "center",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
        // marginBottom: marginBottom,
        margin: margin,
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          color: labelColor,
          marginBottom: marginBottom,
          textAlign: textAlign,
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <input
        type={type}
        className={disabled ? "inputFieldDisabled" : "inputField"}
        style={{
          width: inputWidth,
          color: "rgb(92, 92, 92)",
          paddingRight: paddingRight,
          marginBottom: marginBottom,
          textAlign: type === "number"? "right" : "left"
        }}
        maxLength={maxLength}
        min={type === "number" && 0}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
