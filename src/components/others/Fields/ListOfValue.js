import React from "react";
import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import "./index.css";
function ListOfValue({
  labelWidth,
  inputWidth,
  label,
  placeholder,
  data,
  columns,
  margin,
  title,
  marginBottom,
  onChange,
  required,
  textAlign,
  defaultValue
}) {
  if (!data) {
    data = [""];
  } else {
    data = data;
  }
  //   const dat = ["male", "female", "other"];
  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        alignItems: "center",
        // marginBottom: "15px",
        whiteSpace: "nowrap",
        color: "rgb(92, 92, 92)",
        margin: margin,
      }}
    >
      <label
        style={{
          width: labelWidth,
          fontSize: "85%",
          marginBottom: marginBottom,
          textAlign: textAlign,
        }}
      >
        {label}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </label>
      <Select
        placeholder={placeholder}
        style={{
          width: inputWidth,
          backgroundColor: "white",
          marginBottom: marginBottom,
        }}
        // className="bg-white"
        variant="unstyled"
        searchable
        size={"xs"}
        defaultValue={defaultValue}
        id="selectField"
        rightSection={
          <IoMdSearch style={{ marginLeft: "15px" }} size={18} color="grey" />
        }
        title={title}
        columns={columns}
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={data}
        onChange={onChange}
      />
    </div>
  );
}

export default ListOfValue;
