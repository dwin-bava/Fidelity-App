import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MDBIcon } from "mdb-react-ui-kit";

function PendingOtherApproval({ dataProcessingInfo, tableCellFontSize }) {
  const options = {
    selectableRows: "none",
    rowsPerPage: 7,
    textLabels: {
      body: { noMatch: dataProcessingInfo },
    },
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              //   background: bgColor,
              fontSize: tableCellFontSize,
            },
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: "red !important",
          },
        },
      },
    });

  let data = [[], [], [], [], [], []];

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  const columns = [
    {
      name: "Date",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Account Number",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Currency",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Amount",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Time",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
  ];

  return (
    <div style={{ zoom: "0.85", marginTop: "-7px", marginBottom: "-15px" }}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="Pending Other Approvals"
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default PendingOtherApproval;
