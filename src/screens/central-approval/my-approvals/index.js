import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container, Form, Modal} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MDBIcon } from 'mdb-react-ui-kit';
import { ButtonGroup } from '@mui/material';

import SummaryApprovals from './components/SummaryApprovals';
// import MyPendingApprovalDataTable from './components/MyPendingApprovalDataTable';
// import PendingOtherApprovalDataTable from './components/PendingOtherApprovalDataTable';
import MyApprovalLimitDataTable from './components/MyApprovalLimit';

// import Button from '../../../../components/others/Button/ButtonComponent';

const MyApprovals = () => {

  function capitalizeFirstCharacter(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }


  // const customTheme = JSON.parse(localStorage.getItem('theme'));

  // const headerImage = customTheme.theme.headerImage;

  // const [getTheme, setTheme] = useState(customTheme); 

  const [showMyApprovalLimit, setMyApprovalLimit] = useState(false);


  const MyApprovalLimit = ({ name, showModal, setShowModal }) => {
      const handleClose = () => setShowModal(false);
      const handleShow = () => setShowModal(true);
     
       return (
         <>
           <Modal 
           size="md" 
           className="headModal" 
           show={showModal} 
          //  backdropClassName="modal-backk"
        //    centered
           // onHide={handleClose}
           >
          <Modal.Header style={{ background: `url(` + window.location.origin + `/assets/images/headerBackground/)` }}>
          <div className="w-full -mb-4 flex justify-between ">
            <Modal.Title
              style={{
                fontSize: "14.5px",
                color: "white",
                padding: "10px"
              }}
            >
              <p>My Approval Limit</p>
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
                
                <MyApprovalLimitDataTable />
                
             </Modal.Body>
           </Modal>
         </>
       );
     };


 

  const swal = require('sweetalert');

     function closeModal(formName){

      var closedModalName = capitalizeFirstCharacter(formName);

      swal({
        title: "Are you sure?",
        text: "You're about to close the '" + closedModalName + "' form",
        icon: "warning",
        confirmButtonColor: '#8CD4F5',
        buttons: [ "Cancel", "Yes, Close Form" ],
        dangerMode: true,
        }).then((result) => {
        if (result) {
        var minimizedModals = [];
        var formName = localStorage.getItem('formName');
        if(localStorage.getItem("namesOfMinimizedModals")){
        minimizedModals = JSON.parse(localStorage.getItem("namesOfMinimizedModals"));
        minimizedModals = minimizedModals.filter(e => e !== formName);
        localStorage.setItem("namesOfMinimizedModals", JSON.stringify(minimizedModals));
        }
        document.getElementById('globalModalCloseBtn').click();
        // alert(localStorage.getItem("namesOfMinimizedModals"));
        }
       });
  }

  const { t } = useTranslation();

  return (
    <div>


          <MyApprovalLimit name="Scan Document" showModal={showMyApprovalLimit} setShowModal={setMyApprovalLimit} />

          <div style={{ marginTop: "-15px", textAlign: "center", zoom: "0.85" }}>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="check" /><br />Ok</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="spinner" /><br />Fetch</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-primary' onClick={function (e) { e.preventDefault(); setMyApprovalLimit(!showMyApprovalLimit); }} style={{ background: `url(` + window.location.origin + `/assets/images/headerBackground/)` }}><MDBIcon style={{ color: "white", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="align-center" /><br />App. Limit</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sync" /><br />Refresh</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="thumbs-up" /><br />Authorise</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-light' style={{ background: "white" }}><MDBIcon style={{ color: "grey", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="thumbs-down" /><br />Reject</button>
          </span>

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
          <button className='btn btn-primary' onClick={() => document.getElementById("closeModalBTN").click()} style={{ background: `url(` + window.location.origin + `/assets/images/headerBackground/)` }}><MDBIcon style={{ color: "white", marginLeft: "10px", paddingBottom: 5, fontSize: 15 }} fas icon="sign-out-alt" /><br />Exit</button>
          </span>

          </div> 

          <hr style={{ marginTop: "0px" }} />
          

            <div className='col-12' style={{ zoom: "0.98" }}>
                <SummaryApprovals />
            </div>


            {/* <hr style={{ marginBottom: '10px', marginTop: "25px" }} />

            <div className="float-right -mr-2 -mb-0 pr-2">
            <button
            type="button"
            onClick={()=> document.getElementById("minimizeModal").click() }
            style={{ paddingLeft: "20px", paddingRight: "20px", color: "white" }}
            className="bg-gray-400 text-white text-sm font-medium rounded-sm px-3 py-2"
            >
            Minimize Modal
            </button>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <button
                type="submit"
                onClick={()=> closeModal(localStorage.getItem('formName')) }
                className="bg-red-500 text-white text-sm font-medium rounded-sm px-3 py-2"
            >
            Close Modal
            </button>
            </div> */}
        
    </div>
  );
};

export default MyApprovals;