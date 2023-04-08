import { Select } from "@mantine/core";
import React from "react";
import { IoMdSearch } from "react-icons/io";

function ListOfValue({
  labelWidth,
  inputWidth,
  placeholder,
  label,
  maxLength,
  disabled,
  required,
  lovdata,
  onChange,
}) {
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
        margin: "10px",
        // marginBottom: "20px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
      }}
    >
      <label style={{ width: labelWidth, fontSize: "85%" }}>
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>

      <Select
        placeholder={placeholder}
        style={{
          width: inputWidth,
          borderRadius: "3px",
          border: "none",
          fontsize: "90%",
          // paddingLeft: "7px",
        }}
        disabled={disabled}
        onChange={onChange}
        searchable
        size={"xs"}
        id="listOfValue"
        rightSection={
          <IoMdSearch style={{ marginLeft: "15px" }} size={18} color="grey" />
        }
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={lovdata}
      />
    </div>
  );
}

export default ListOfValue;
