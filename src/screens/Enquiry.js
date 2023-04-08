import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import fid from "../assets/fiiiiid.png";
import { Button } from "@mantine/core";
import { HiHome } from "react-icons/hi";
// import { Slider, RangeSlider, Checkbox } from "@mantine/core";
import ButtonComponent from "../components/button/ButtonComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { FaMoneyCheckAlt } from "react-icons/fa";
import {
  MdCalculate,
  MdMessage,
  MdPendingActions,
  MdOutlineMenu,
} from "react-icons/md";
// import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
// import { HiDocument, HiDocumentAdd } from "react-icons/hi";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { IoExit } from "react-icons/io5";
import HeaderComponent from "../components/header/HeaderComponent";
// import Label from "../components/label/Label";
import ListOfValue from "../components/fields/ListOfValue";
// import Box from "@mui/material/Box";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import SelectField from "../components/fields/SelectField";
import { Menu, Text } from "@mantine/core";
import { BsFillCheckCircleFill } from "react-icons/bs";
import MyApprovals from "./central-approval/my-approvals";
import SummaryApproval from "./central-approval/my-approvals/components/SummaryApprovals";
// import { Modal } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FacilityEnquiry from '../components/Headers/components/facility-enquiry';
import { FiX } from "react-icons/fi";



const Enquiry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const navigateToLoan = () => {
    // 👇️ navigate to /contacts
    navigate("/Loan");
  };

  // const navigateHome = () => {
  //   // 👇️ navigate to /
  //   navigate("/");
  // };

  const navigateToLogin = () => {
    // 👇️ navigate to /
    navigate("/");
  };
  return (
    <div className="enqq">
      <div className="nav">
        <div style={{ flex: "0.1" }}></div>
        <div style={{ flex: "0.8" }}>
          <div className="nav1">
            <div className="logo">
              <img src={fid} height="60px" width={"250px"} alt="" />
            </div>
          </div>
          <div className="nav2">
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ marginTop: "-5px" }}>
                <Button
                  size="md"
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Home
                </Button>
              </div>
              {/* <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<GiReceiveMoney size="1rem" />}
              >
                Approved Loans
              </Button>
            </div> */}
              {/* <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<MdMessage size="1rem" />}
              >
                Messages
              </Button>
            </div> */}
            </div>

            {/* <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<AiFillEye size="1rem" />}
              >
                Pending Approvals 
              </Button>
            </div> */}
            <div style={{ display: "flex" }}>
              <div>
                <Menu color={"orange"} shadow="md" width={200}>
                  <Menu.Target>
                    <Button icon={<GiReceiveMoney size="1rem" />}>
                      <HiOutlineMenu size={27} />
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Applications</Menu.Label>
                    <Menu.Item
                      icon={<AiOutlineSearch size={14} />}
                      rightSection={
                        <Text size="xs" color="dimmed">
                          ⌘K
                        </Text>
                      }
                    >
                      Search
                    </Menu.Item>

                    <Menu.Item icon={<BsFillCheckCircleFill size={14} />}>
                      Approved Loans
                    </Menu.Item>
                    <Menu.Item
                      onClick={handleShow}
                      icon={<MdPendingActions size={14} />}
                    >
                      Facility Enquiry
                    </Menu.Item>
                    <Menu.Item icon={<MdMessage size={14} />}>
                      Messages
                    </Menu.Item>

                    <Menu.Divider />

                    {/* <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                    Transfer my data
                  </Menu.Item> */}
                    <Menu.Item
                      color="red"
                      icon={<IoExit size={14} />}
                      onClick={navigateToLogin}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
              {/* <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<IoExit size="1rem" />}
                  onClick={navigateToLogin}
                >
                  Logout
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>
      <br />
      <div className="mid">
        <div style={{ flex: "0.1" }}></div>
        <div style={{ flex: 0.8 }}>
          {/* <MyApprovals/> */}
          <SummaryApproval />
          {/* <MyApprovalLimitDataTable /> */}
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>
      <div>
        <>
          <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            backdropClassName="modal-backk"
          >
            <Modal.Header  style={{padding: "5px", backgroundColor: 'orange', color: "white"}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%'}}>
              <div>Facility Enquiries</div>
              <div style={{padding: '7px'}} onClick={handleClose}><FiX /></div>
                </div>
            </Modal.Header>
            <Modal.Body style={{zoom: 0.85}}>
              <FacilityEnquiry />
              {/* <LoanGeneralEnquiry/> */}
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer> */}
          </Modal>
        </>
      </div>
    </div>
  );
};

export default Enquiry;
