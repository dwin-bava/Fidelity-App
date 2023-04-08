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
  //   const options = {
  //     filterType: "checkbox",
  //     rowsPerPage: rowsPerPage, // rows to display per page
  //   };
  //

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              // background: bgColor,
              fontSize: "85%",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              background: "#ffdc9c",
              fontSize: "90%",
              padding: "0px",
            },
          },
        },
      },
    });

  // const customTheme = JSON.parse(localStorage.getItem("theme"));

  // const bgColor =
  //   `url(` +
  //   window.location.origin +
  //   `/assets/images/background/` +
  //   customTheme.theme.backgroundImage +
  //   `)`;

  return (
      <div>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={title}
            data={data} //should in an array
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    // <div>
    //   <MUIDataTable
    //     title={title}
    //     data={data} // example: ["James Houston", "Test Corp", "Dallas", "TX"],
    //     columns={columns} // example: ["Name", "Company", "City", "State"]
    //     options={options}
    //   />
    // </div>
  );
}

export default DataTable;
