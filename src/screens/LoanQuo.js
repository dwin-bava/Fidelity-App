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
// import { useState } from "react";
// import { Stepper, Group } from "@mantine/core";
import ArrowStepper from "../components/arrow-stepper/arrow-stepper";
import { Modal } from "react-bootstrap";
import DataTable from "../components/data-table/DataTable";

const columns = [
  {
    field: "Date",
    headerName: "Date",
    type: "date",
    width: 90,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "BestBalance",
    headerName: "Best Balance",
    type: "number",
    width: 160,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "WorseBalance",
    headerName: "Worse Balance",
    type: "number",
    width: 160,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "AverageBalance",
    headerName: "Average Balance",
    type: "number",
    width: 160,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "DebitTurnover",
    headerName: "Debit Turnover",
    type: "number",
    width: 150,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "CreditTurnover",
    headerName: "Credit Turnover",
    type: "number",
    width: 160,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "COT",
    headerName: "COT",
    type: "number",
    width: 100,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "FeesAndComm",
    headerName: "Fees and Comm.",
    type: "number",
    width: 160,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Interest",
    headerName: "Interest",
    type: "number",
    width: 100,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [];

function LoanQuo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
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
                    <Menu.Item icon={<MdPendingActions size={14} />}>
                      Pending Approvals
                    </Menu.Item>
                    <Menu.Item icon={<BsFillCheckCircleFill size={14} />}>
                      Approved Loans
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
      <br></br>
      <div className="mid">
        <div style={{ flex: "0.1" }}></div>
        <div
          className=""
          style={{
            flex: "0.8",
            padding: "15px",
            border: "none",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            backgroundColor: "white",
          }}
        >
          <div>
            <HeaderComponent
              title={"Loan Application"}
              icon={<GiReceiveMoney />}
              backgroundColor={"black"}
              color={"white"}
              fontSize={"20px"}
            />
          </div>
          <br></br>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div
              style={{
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                backgroundColor: "white",
                borderRadius: "5px",
                width: "30%",
              }}
            >
              <div>
                <InputField
                  label={"Application Number"}
                  labelWidth={"50%"}
                  disabled
                />
              </div>
              <div style={{}}>
                <InputField
                  label={"Pep Status"}
                  labelWidth={"50%"}
                  disabled
                  color={"red"}
                />
              </div>
              <div style={{}}>
                <InputField
                  label={"Risk Status"}
                  labelWidth={"50%"}
                  disabled
                  color={"red"}
                />
              </div>
            </div>
          </div>
          <br></br>
          <div
            style={{
              padding: "10px",
              border: "0.5px solid #d6d7d9",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <div style={{ borderBottom: "1px solid" }}>
              <h5>Account Details</h5>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  // marginRight: "160px",
                  // gap: "56px",
                }}
              >
                <div style={{ flex: "0.35" }}>
                  <InputField
                    label={"Customer Number"}
                    required
                    labelWidth={"50%"}
                  />
                </div>
                <div style={{ flex: "0.2" }}>
                  <InputField
                    label={"Currency"}
                    inputWidth={"80px"}
                    labelWidth={"40%"}
                    disabled
                  />
                </div>
                <div style={{ flex: "0.4" }}>
                  <InputField
                    label={"Customer Type"}
                    labelWidth={"37%"}
                    inputWidth={"63%"}
                    disabled
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  // marginTop: "15px",
                  // marginRight: "60px",
                  // gap: "210px",
                }}
              >
                <div style={{ flex: "0.55" }}>
                  <ListOfValue
                    label={"Servicing Account"}
                    inputWidth={"60%"}
                    labelWidth={"31%"}
                  />
                </div>
                <div style={{ flex: "0.45" }}>
                  <InputField
                    label={"Customer Name"}
                    inputWidth={"55%"}
                    labelWidth={"33%"}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div>
            <ArrowStepper />
          </div>

          <br></br>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                {/* <ButtonComponent
                  label={"Apply"}
                  buttonBackgroundColor={"orange"}
                  buttonColor={"white"}
                  buttonHeight={"40px"}
                  buttonWidth={"100px"}
                /> */}
              </div>
              {/* <div>
                <ButtonComponent
                  label={"View Schedule"}
                  buttonBackgroundColor={"orange"}
                  buttonColor={"white"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  onClick={handleButtonClick}
                />
              </div> */}
            </div>
          </div>
          {/* <br></br> */}
          {/* <div
            style={{
              padding: "10px",
              border: "none",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "white",
            }}
          >
            <div> */}
          {/* <div>
                <Box
                  sx={{
                    height: "180px",
                    width: "auto",
                    borderRadius: "5px",

                    // marginLeft: "20px",

                    "& .super-app-theme--header": {
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "",
                      fontSize: "16px",
                    },
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </div> */}
          {/* </div>
          </div>
          <br></br> */}
          <div style={{ display: "flex" }}>
            <div>
              {/* <ButtonComponent
                label={"Back"}
                buttonBackgroundColor={"orange"}
                buttonColor={"white"}
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                onClick={navigateHome}
              /> */}
            </div>
            <div></div>
          </div>
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>

      <br></br>
    </div>
  );
}

export default LoanQuo;
