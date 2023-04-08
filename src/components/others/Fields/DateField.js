import React from 'react'
import { DatePicker } from "@mantine/dates";
import { IoCalendarOutline } from "react-icons/io5";
import "./index.css"
const DateField = ({inputWidth}) => {
  return (
    <div>
         <DatePicker
          variant="unstyled"
          width={inputWidth}
          style={{ width: inputWidth, color: "rgb(92, 92, 92)" }}
          // inputFormat="DD/MM/YYYY"
          placeholder="Pick a date"
          id="dateField"
          rightSection={<IoCalendarOutline size={18} color="grey" />}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
    </div>
  )
}

export default DateField