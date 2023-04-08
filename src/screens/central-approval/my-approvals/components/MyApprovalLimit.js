import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MDBIcon } from "mdb-react-ui-kit";

function DataTable({ dataProcessingInfo, tableCellFontSize }) {
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
    ["Cash", "SLE", ".00", "900,000,000,000.00"],
    ["Cash", "GBP", ".00", "2,500.00"],
    ["Cash", "USD", ".00", "5000.00"],
    ["Cash", "EUR", ".00", "2,500.00"],
    ["NCash", "SLE", ".00", "-900,000,000,000.00"],
    ["NCash", "GBP", ".00", "-900,000,000,000.00"],
    ["NCash", "EUR", ".00", "-900,000,000,000.00"],
    ["NCash", "USD", ".00", "-900,000,000,000.00"],
  ];

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  const columns = [
    {
      name: "Limit Cat",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Curr",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Min Db Limit",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Max Db Limit",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
  ];

  return (
    <div style={{ zoom: "0.8", marginTop: "-7px", marginBottom: "-15px" }}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="My Approval Limit"
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default DataTable;
