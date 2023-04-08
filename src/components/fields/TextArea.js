import React from "react";

function TextAreaField({ labelWidth, inputWidth, label, disabled, required }) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // marginBottom: "15px",
        margin:'10px',
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label style={{ width: labelWidth, fontSize: "90%" }}>
        {label}
        {required === true ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <textarea
        className="inputField"
        style={{ width: inputWidth, color: "#595959" }}
        disabled={disabled}
        required={required}
      ></textarea>
    </div>
  );
}

export default TextAreaField;
