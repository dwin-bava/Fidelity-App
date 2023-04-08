import React from "react";
import InputField from "../components/fields/InputField";

function ComponentsToUse() {
  return (
    <div style={{ margin: "40px", display: "flex" }}>
      <InputField label="Hello" labelWidth="50%" inputWidth="100%" />
    </div>
  );
}

export default ComponentsToUse;
