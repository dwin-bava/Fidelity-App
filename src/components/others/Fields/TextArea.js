import React from "react";
import "./index.css";

function TextAreaField({ labelWidth, inputWidth, label, disabled, required,rows,cols, margin, marginBottom}) {
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: margin,
        // marginBottom: "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label style={{ width: labelWidth, fontSize: "85%", marginBottom: marginBottom, }}>
        {label}
        {required === true ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <textarea
        className="textareafield"
        rows={rows}
        style={{ width: inputWidth, color: "#595959", marginBottom: marginBottom,}}
        disabled={disabled}
        required={required}
        cols={cols}
      />
    </div>
  );
}

export default TextAreaField;
