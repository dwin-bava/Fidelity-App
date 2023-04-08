import React from "react";

function Label({ label, labelWidth, fontSize, fontWeight, color }) {
    // label width should be in percentages
  return <label style={{ width: labelWidth, color: color, fontSize: '85%', fontWeight: fontWeight, margin:'10px' }}>{label}</label>;
}

export default Label;
