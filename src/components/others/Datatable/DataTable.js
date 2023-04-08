import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function DataTable({
  title,
  data,
  dataProcessingInfo,
  rowsPerPage,
  tableCellFontSize,
  columns,
}) {
  const options = {
    selectableRows: false,
    rowsPerPage: rowsPerPage,
    textLabels: {
      body: { noMatch: dataProcessingInfo },
    },
  };
    // const options = {
    //   filterType: "checkbox",
    //   rowsPerPage: rowsPerPage, // rows to display per page
    // };
  
    const bgColor = "#ffe1c4";

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              // background: bgColor,
              fontSize: tableCellFontSize,
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              background: bgColor,
              fontSize: tableCellFontSize,
            },
          },
        },
      },
    });

  // const customTheme = JSON.parse(localStorage.getItem("theme"));

  // const bgColor = 'orange';

  // const getMuiTheme = () =>
  //   createTheme({
  //     components: {
  //       MUIDataTableBodyCell: {
  //         styleOverrides: {
  //           root: {
  //             background: 'orange',
  //             fontSize: "85%",
  //           },
  //         },
  //       },
  //       MUIDataTableHeadCell: {
  //         styleOverrides: {
  //           root: {
  //             background: "#ffdc9c",
  //             fontSize: "90%",
  //             padding: "0px",
  //           },
  //         },
  //       },
  //     },
  //   });

  return (
    <div style={{ zoom: "0.85" }}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title}
          data={data} //should in an array
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default DataTable;
