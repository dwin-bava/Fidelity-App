import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Row, Col, Container, Form, Modal } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

// import ApprovalDetails from "./ApprovalDetails";
import Approval from "../../../Approval";

function PreviewPendingApproval({ dataProcessingInfo, tableCellFontSize }) {
  // const customTheme = JSON.parse(localStorage.getItem('theme'));

  const bgColor = "#ffe1c4";

  // const headerImage = customTheme.theme.headerImage;

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
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

  const [showApprovalDetials, setApprovalDetails] = useState(false);

  const [showApproval, setApproval] = useState(false);

  const ApprovalModal = ({ name, showModal, setShowModal }) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
      <>
        <Modal
          size="xl"
          backdropClassName="modal-backk"
          //  className="headModal"
          show={showModal}
          centered
          // fullscreen
          //  onHide={handleClose}
        >
          <Modal.Header style={{ background: "orange" }}>
            <div className="w-full -mb-4 flex justify-between ">
              <Modal.Title
                style={{
                  fontSize: "14.5px",
                  color: "white",
                  padding: "10px",
                }}
              >
                {/* <p>Credit Origination Verification &nbsp;( Count: 8 )</p> */}
              </Modal.Title>
              <svg
                onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Modal.Header>

          <Modal.Body style={{ background: "white", zoom: "0.6" }}>
            <Approval setShowModalC={setShowModal} />
          </Modal.Body>
        </Modal>
      </>
    );
  };

  let data = [
    [
      "31-AUG-2022",
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "",
      ".00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) {
            e.preventDefault();
            setApproval(!showApproval);
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </button>
      </div>,
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "",
      ".00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) {
            e.preventDefault();
            setApproval(!showApproval);
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </button>
      </div>,
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "",
      ".00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) {
            e.preventDefault();
            setApproval(!showApproval);
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </button>
      </div>,
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "",
      ".00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) {
            e.preventDefault();
            setApproval(!showApproval);
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </button>
      </div>,
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "",
      ".00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) {
            e.preventDefault();
            setApproval(!showApproval);
          }}
          className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
        >
          <div className="flex space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </button>
      </div>,
    ],
  ];

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
      name: "Account No.",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Name",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Branch",
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
      name: "Amount",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Posted By",
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
    {
      name: "Action",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
  ];

  return (
    <div style={{ zoom: "0.9", marginTop: "-7px", marginBottom: "0px" }}>
      <ApprovalModal
        name="Pending Approval Details"
        showModal={showApproval}
        setShowModal={setApproval}
      />

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
              Credit Origination Verification
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

export default PreviewPendingApproval;
