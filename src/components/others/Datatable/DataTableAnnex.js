import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

// const columns = [];

// const rows = [];

function DataTableAnnex(props) {
  return (
    <div style={{ height: 200, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}

export default DataTableAnnex;
