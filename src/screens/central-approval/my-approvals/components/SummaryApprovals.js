import React, { useState, useEffect }  from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import PreviewPendingApprovalsDataTable from './PreviewPendingApprovals';

function SummaryApproval({ title, dataProcessingInfo, rowsPerPage, tableCellFontSize }) {
  const options = { selectableRows: "none", rowsPerPage: 10, textLabels: {
    body: { noMatch: dataProcessingInfo } } };

    // const customTheme = JSON.parse(localStorage.getItem('theme'));

    // const headerImage = customTheme.theme.headerImage;

    const [showPreviewPendingApprovals, setPreviewPendingApprovals] = useState(false);

    const bgColor = "#ffe1c4";

    const getMuiTheme = () => createTheme({
        components: {
          MUIDataTableBodyCell: {
            styleOverrides:{
              root: {
                  fontSize: "16.5px",
              },
              
            }
          },
          MuiTableCell: {
            head: {
                backgroundColor: "red !important"
            }
        }, 
        }
      });



      const PreviewPendingApprovalsModal = ({ name, showModal, setShowModal }) => {
      const handleClose = () => setShowModal(false);
      const handleShow = () => setShowModal(true);
     
       return (
         <>
           <Modal
             size="xl"
             className="headModal"
             show={showModal}
             centered
             backdropClassName="modal-backk"
             // onHide={handleClose}
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
                   {/* <p>Credit Enquiry &nbsp;( Count: 8 )</p> */}
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

             <Modal.Body style={{ background: "white" }}>
               <PreviewPendingApprovalsDataTable />
             </Modal.Body>
           </Modal>
         </>
       );
     };


      let data = [ 
        [1, "Credit Origination Verification", 5, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [2, "Credit Approval", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white"}}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [3, "Credit Disbursement Approval", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white"}}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [4, "Account Mandate / Image Amendment", 1, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white", background: '' }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>], 
        [5, "Approve Batch Transactions", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>], 
        [6, "Cheque Approval", 5, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>], 
        [7, "Cheque Book Requisition", 4, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white"}}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>], 
        [8, "Collateral Creation", 8, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white"}}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>], 
        [9, "FD Deal/CallAccount Approval (HeadOffice/Bra)", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [10, "Finance Voucher Approvals", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [11, "Inward Specie Approval", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
        [12, "Lien Approval", 3, <div className="flex space-x-3">
        <button
          style={{ fontSize: "15px", color: "white" }}
          onClick={function (e) { e.preventDefault(); setPreviewPendingApprovals(!showPreviewPendingApprovals); }}
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
          
          &nbsp; 

          </div>
        </button>
      </div>],
      ];


      const columns = [
          {
            name: '#',
            options: {
              setCellHeaderProps: () => ({
                style: { background: bgColor, color: 'black' },
              }),
            },
          },
          {
            name: 'Pending Approval Summary',
            options: {
              setCellHeaderProps: () => ({
                style: { background: bgColor, color: 'black' },
              }),
            },
          },
          {
            name: 'Count',
            options: {
              setCellHeaderProps: () => ({
                style: { background: bgColor, color: 'black' },
              }),
            },
          },
          {
            name: 'Action',
            options: {
              setCellHeaderProps: () => ({
                style: { background: bgColor, color: 'black' },
              }),
            },
          },
        ]

  return (
    <div style={{ zoom: "0.78", marginTop: "-7px", marginBottom: "-15px" }}>

      <PreviewPendingApprovalsModal name="Preview Pending Approvals" showModal={showPreviewPendingApprovals} setShowModal={setPreviewPendingApprovals} />

      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
            title={<b style={{ fontSize: "20px", fontFamily: "calibri", textTransform: "uppercase" }}>Summary Approvals</b>}
            data={data}
            columns={columns}
            options={options}
        />
      </ThemeProvider>
    </div>
  );
}

export default SummaryApproval;
