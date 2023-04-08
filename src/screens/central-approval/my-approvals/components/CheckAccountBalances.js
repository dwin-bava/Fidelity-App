import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { MDBIcon } from "mdb-react-ui-kit";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function CheckAccountBalances({ dataProcessingInfo, tableCellFontSize }) {
  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  const headerImage = customTheme.theme.headerImage;

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

  let data = [
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
    [
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
    ],
  ];

  const columns = [
    {
      name: "Account Number",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Current Balance",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Transaction Amount",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Transaction Details",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Balance After Transaction",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
  ];

  return (
    <div
      className=""
      style={{ zoom: "0.85", marginTop: "-5px", marginBottom: "5px" }}
    >
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={
            <b
              style={{
                fontSize: "20px",
                fontFamily: "calibri",
                textTransform: "uppercase",
              }}
            >
              Account Balance Details
            </b>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default CheckAccountBalances;
