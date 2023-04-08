import React, { useState } from "react";
import AccountBalances from "./CheckAccountBalances";
import MUIDataTable from "mui-datatables";
import { MDBIcon } from "mdb-react-ui-kit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Row, Col, Container, Form, Modal } from "react-bootstrap";
const swal = require("sweetalert");

function ApprovalDetails({
  dataProcessingInfo,
  tableCellFontSize,
  setShowModalC,
}) {
  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const bgColor =
    `url(` +
    window.location.origin +
    `/assets/images/background/` +
    customTheme.theme.backgroundImage +
    `)`;

  const headerImage = customTheme.theme.headerImage;

  const [rowsSelected, setRowsSelected] = useState([]);

  const [showCheckAccountBalances, setCheckAccountBalances] = useState(false);

  function authorize() {
    if (rowsSelected.length > 0) {
      swal({
        title: "Are you sure?",
        text: "You're about to approve the batch transactions",
        icon: "warning",
        confirmButtonColor: "#8CD4F5",
        buttons: ["Cancel", "Yes, Approve"],
        dangerMode: true,
      }).then((result) => {
        if (result) {
          swal({
            title: "Approved Successfully",
            text: "The batch transactions has been approved",
            icon: "success",
            button: "Ok",
          }).then((result) => {
            setShowModalC(false);
          });
        }
      });
    }
  }

  function reject() {
    if (rowsSelected.length > 0) {
      swal({
        title: "Are you sure?",
        text: "You're about to reject the batch transactions",
        icon: "warning",
        confirmButtonColor: "#8CD4F5",
        buttons: ["Cancel", "Yes, Reject"],
        dangerMode: true,
      }).then((result) => {
        if (result) {
          swal({
            title: "Rejected Successfully",
            text: "The batch transactions has been rejected",
            icon: "success",
            button: "Ok",
          }).then((result) => {
            setShowModalC(false);
          });
        }
      });
    }
  }

  const CheckAccountBalances = ({ name, showModal, setShowModal }) => {
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
      <>
        <Modal
          size="lg"
          backdropClassName="modal-backk"
          //  className="headModal"
          show={showModal}
          centered
          //  fullscreen={true}
          // onHide={handleClose}
        >
          <Modal.Header
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                headerImage +
                `)`,
            }}
          >
            <div className="w-full -mb-4 flex justify-between ">
              <Modal.Title
                style={{
                  fontSize: "14.5px",
                  color: "white",
                  padding: "10px",
                }}
              >
                <p>Account Balances</p>
              </Modal.Title>
              <svg
                id="exitBTN"
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

          <Modal.Body style={{ background: "white", zoom: "0.85" }}>
            <AccountBalances />
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const options = {
    selectableRows: "multiple",
    rowsSelected: rowsSelected,
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

  function check() {
    document.getElementById("authorizeBTN").style.background =
      `url(` +
      window.location.origin +
      `/assets/images/headerBackground/` +
      headerImage +
      `)`;
    document.getElementById("authorizeBTN").style.color = "white";
    document.getElementById("authorizeBTNIcon").style.color = "white";

    document.getElementById("rejectBTN").style.background =
      `url(` +
      window.location.origin +
      `/assets/images/headerBackground/` +
      headerImage +
      `)`;
    document.getElementById("rejectBTN").style.color = "white";
    document.getElementById("rejectBTNIcon").style.color = "white";
  }

  function checkAll() {
    setRowsSelected([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    document.getElementById("authorizeBTN").style.background =
      `url(` +
      window.location.origin +
      `/assets/images/headerBackground/` +
      headerImage +
      `)`;
    document.getElementById("authorizeBTN").style.color = "white";
    document.getElementById("authorizeBTNIcon").style.color = "white";

    document.getElementById("rejectBTN").style.background =
      `url(` +
      window.location.origin +
      `/assets/images/headerBackground/` +
      headerImage +
      `)`;
    document.getElementById("rejectBTN").style.color = "white";
    document.getElementById("rejectBTNIcon").style.color = "white";
  }

  function unCheckAll() {
    setRowsSelected([]);
    document.getElementById("authorizeBTN").style.background = "#f2f2f2";
    document.getElementById("authorizeBTN").style.color = "grey";
    document.getElementById("authorizeBTNIcon").style.color = "grey";

    document.getElementById("rejectBTN").style.background = "#f2f2f2";
    document.getElementById("rejectBTN").style.color = "grey";
    document.getElementById("rejectBTNIcon").style.color = "grey";
  }

  let data = [
    [
      "31-AUG-2022",
      "004001100000020135",
      "ABDUL UNION15831",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      //

      //   <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      //
      //   , <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      //
      //   , <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
    ],
    [
      "31-AUG-2022",
      "004001100000020135",
      "KADIJA UNION92343",
      "HEAD OFFICE",
      "100.00",
      "235.00",
      "UNION SYSTEMS SUPPORT",
      "16:31:16",
      "USD",

      // ,

      // <div className="flex space-x-3">
      //   <button
      //     style={{ fontSize: "15px" }}
      //     onClick={function (e) { e.preventDefault(); setPendingApprovalDetails(!showPendingApprovalDetials); }}
      //     className="hover:scale-110 transition transform ease-in-out bg-red-700  px-2 py-1 rounded-sm text-center text-white"
      //   >

      //     <div className="flex space-x-3">

      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5"
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      //       />
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      //       />
      //     </svg>

      //     </div>
      //   </button>

      //   &nbsp;&nbsp;

      //   <button
      //     onClick={function (e) {
      //       e.preventDefault();
      //       setShowModal(!showModal);
      //       // console.log(i.menu_id, "parent");
      //       setParentId({
      //         id: i.menu_id,
      //         name: i.menu_name,
      //         type: "edit",
      //         content: i,
      //       });
      //     }}
      //     className="hover:scale-110 transition transform ease-in-out bg-cyan-400  px-2 py-1 rounded-sm text-center text-white"
      //   >
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       fill="none"
      //       viewBox="0 0 24 24"
      //       strokeWidth={1.5}
      //       stroke="currentColor"
      //       className="w-5 h-5 "
      //     >
      //       <path
      //         strokeLinecap="round"
      //         strokeLinejoin="round"
      //         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //       />
      //     </svg>
      //   </button>
      // </div>
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
      name: "Description",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Document Ref.",
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
      name: "Amount DB",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Amount CR",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    {
      name: "Value Date",
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
      name: "Currency",
      options: {
        setCellHeaderProps: () => ({
          style: { background: bgColor, color: "black" },
        }),
      },
    },
    // {
    //   name: 'Action',
    //   options: {
    //     setCellHeaderProps: () => ({
    //       style: { background: bgColor, color: 'black' },
    //     }),
    //   },
    // },
  ];

  return (
    <div style={{ zoom: "1", marginTop: "-7px", marginBottom: "-15px" }}>
      <CheckAccountBalances
        name="Check Account Balances"
        showModal={showCheckAccountBalances}
        setShowModal={setCheckAccountBalances}
      />

      <div style={{ marginTop: "-15px", textAlign: "center", zoom: "0.85" }}>
        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="file-alt"
            />
            <br />
            New
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="times"
            />
            <br />
            Delete
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button
            className="btn btn-light"
            id="authorizeBTN"
            onClick={() => authorize()}
          >
            <MDBIcon
              id="authorizeBTNIcon"
              style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
              fas
              icon="thumbs-up"
            />
            <br />
            Authorize
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="check"
            />
            <br />
            View
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="sync"
            />
            <br />
            Ok
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="ban"
            />
            <br />
            Cancel
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button
            className="btn btn-light"
            id="rejectBTN"
            onClick={() => reject()}
          >
            <MDBIcon
              id="rejectBTNIcon"
              style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
              fas
              icon="thumbs-down"
            />
            <br />
            Reject
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className="btn btn-light" style={{ background: "white" }}>
            <MDBIcon
              style={{
                color: "grey",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="question-circle"
            />
            <br />
            Help
          </button>
        </span>

        <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalC(false)}
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                headerImage +
                `)`,
            }}
          >
            <MDBIcon
              style={{
                color: "white",
                marginLeft: "10px",
                paddingBottom: 5,
                fontSize: 15,
              }}
              fas
              icon="sign-out-alt"
            />
            <br />
            Exit
          </button>
        </span>
      </div>

      <hr style={{ marginTop: "4px", marginBottom: "20px" }} />

      <div
        className="flex flex-row space-x-12"
        style={{ textAlign: "center", justifyContent: "center" }}
      >
        <p>
          Posted By :{" "}
          <b style={{ padding: "7px", background: "whitesmoke" }}>SJALLOH</b>
        </p>
        <p>
          Posted Date :{" "}
          <b style={{ padding: "7px", background: "whitesmoke" }}>
            01-March-2023
          </b>
        </p>
        <p>
          Batch Number :{" "}
          <b style={{ padding: "7px", background: "whitesmoke" }}>
            2022080244186
          </b>
        </p>
      </div>

      <hr style={{ marginTop: "2px" }} />

      <div className="-mt-1">
        <div className="float-left">
          <button
            onClick={function (e) {
              e.preventDefault();
              setCheckAccountBalances(!showCheckAccountBalances);
            }}
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                headerImage +
                `)`,
              color: "white",
            }}
            className="btn btn-light btn-sm"
          >
            <MDBIcon
              style={{ color: "white", fontSize: 15, marginRight: "5px" }}
              fas
              icon="list-alt"
            />
            Check Account Balances
          </button>
        </div>
        <div className="float-right space-x-1">
          <button
            className="btn btn-light btn-sm"
            onClick={() => checkAll()}
            style={{
              color: "white",
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                headerImage +
                `)`,
            }}
          >
            <MDBIcon
              style={{ color: "white", fontSize: 15, marginRight: "5px" }}
              fas
              icon="check-circle"
            />
            Check All
          </button>
          <button className="btn btn-light btn-sm" onClick={() => unCheckAll()}>
            <MDBIcon
              style={{ color: "grey", fontSize: 15, marginRight: "5px" }}
              far
              icon="check-circle"
            />
            Uncheck All
          </button>
        </div>
      </div>

      <div
        className=""
        style={{ zoom: "0.85", marginTop: "78px", marginBottom: "25px" }}
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
                Batch Postings
              </b>
            }
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ApprovalDetails;
