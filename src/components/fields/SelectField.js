import React from "react";
import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";

function SelectField({
  labelWidth,
  inputWidth,
  label,
  placeholder,
  required,
  onChange,
  lovdata,
  // fontSize,
  // fontWeight,
}) {
  //   const dat = ["male", "female", "other"];
  const handleOpen = () => {
    var focusTrigger = document.getElementById("theField");
    focusTrigger.focus();
  };
  if (lovdata) {
    lovdata = lovdata;
  } else {
    lovdata = ["No data"];
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // marginBottom: "15px",
        margin: "10px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label style={{ width: labelWidth, fontSize: '85%' }}>
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <Select
        placeholder={placeholder}
        style={{
          width: inputWidth,
          backgroundColor: "white",
        }}
        onChange={onChange}
        variant="unstyled"
        searchable
        size={"xs"}
        id="selectField"
        rightSection={
          <FiChevronDown
            style={{ marginLeft: "15px" }}
            size={18}
            color="grey"
          />
        }
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={lovdata}
      />
    </div>
  );
}

export default SelectField;
