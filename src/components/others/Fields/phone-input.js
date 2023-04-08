import React, { useState } from "react";
import ReactDOM from "react-dom";
import PhoneInput from "react-phone-number-input";

function PhoneNumberField() {
   const [phoneNumber, setPhoneNumber] = useState("");

   function handleChange(event) {
     setPhoneNumber(event.target.value);
   }

   function formatPhoneNumber(phoneNumberString) {
     const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
     const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
     if (match) {
       return "(" + match[1] + ") " + match[2] + "-" + match[3];
     }
     return phoneNumberString;
   }

  return (
    <div>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formatPhoneNumber(phoneNumber)}
        onChange={handleChange}
      />
    </div>
  );
}

export default PhoneNumberField;

