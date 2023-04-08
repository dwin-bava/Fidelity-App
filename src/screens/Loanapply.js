import React from "react";
import ButtonComponent from "../components/button/ButtonComponent";
import DataTable from "../components/data-table/DataTable";
import InputFields from "../components/fields/InputField";
import ListOfValue from "../components/fields/ListOfValue";
import SelectField from "../components/fields/SelectField";
import Header from "../components/header/HeaderComponent";
import Label from "../components/label/Label";
import "./CashCash.css";
import { GiReceiveMoney } from "react-icons/gi";
import HeaderComponent from "../components/header/HeaderComponent";
import "./Loanfid.css";
import fid from "../assets/fiiiiid.png";
import { Button } from "@mantine/core";
import { HiHome } from "react-icons/hi";
import { Slider, RangeSlider, Checkbox } from "@mantine/core";
import InputField from "../components/fields/InputField";
import { fontSize } from "@mui/system";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";

const Loanapply = () => {
    const navigate = useNavigate();

    const navigateToLoan = () => {
      // 👇️ navigate to /contacts
      navigate("/Loan");
    };

    const navigateHome = () => {
      // 👇️ navigate to /
      navigate("/fid");
    };
  return (
    <div>
      <div className="main">
        <div className="nav">
          <div style={{ flex: "0.2" }}></div>
          <div style={{ flex: "0.6" }}>
            <div className="nav1">
              <div className="logo">
                <img src={fid} height="60px" width={"250px"} alt="" />
              </div>
            </div>
            <div className="nav2">
              <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Home
                </Button>
              </div>
              <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Loan Application
                </Button>
              </div>
              <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Messages
                </Button>
              </div>
              <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Documents
                </Button>
              </div>
              <div>
                <Button
                  variant="filled"
                  color="orange"
                  leftIcon={<HiHome size="1rem" />}
                >
                  Start New Application
                </Button>
              </div>
            </div>
          </div>
          <div style={{ flex: "0.2" }}></div>
        </div>
        <br></br>
        <div className="mid">
          <div style={{ flex: "0.2" }}></div>
          <div className="content" style={{ flex: "0.6" }}>
            <div className="container" style={{}}>
              {/* <div className="main"> */}
              <div
                className="header"
                style={{ marginBottom: "20px", marginTop: "" }}
              >
                <HeaderComponent
                  title={"LOAN APPLICATION"}
                  icon={<GiReceiveMoney size={25} />}
                />
              </div>
              <div
                className="top"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div></div>
                {/* <div className="accNo"> */}
                {/* <InputFields
                    label={"Account Number"}
                    handleEnter={handleEnter}
                    inputWidth={""}
                    /> */}
                {/* </div> */}
              </div>
              <br></br>
              <div className="" id="bambi">
                <div className="description">
                  <div className="leftD" style={{ width: "" }}>
                    <div>
                      <InputFields
                        label={"Customer Number"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Customer Type"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                  </div>
                  <div className="rightD" style={{ width: "" }}>
                    <div>
                      <InputFields
                        label={"Currency"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Account Number"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                {/* <br></br> */}
                <div className="" style={{ display: "flex" }}>
                  {/* <div className="" style={{ flex: "0.4" }}>
                        <div style={{ display: "flex" }}>
                        <>
                            <RingProgress
                            sections={[{ value: 60, color: "blue" }]}
                            label={
                                <Text color="blue" weight={700} align="center" size="xl">
                                60%
                                </Text>
                            }
                            />

                            <RingProgress
                            sections={[{ value: 80, color: "teal" }]}
                            label={
                                <Center>
                                <ThemeIcon
                                    color="teal"
                                    variant="light"
                                    radius="xl"
                                    size="xl"
                                >
                                    <FcCheckmark size={24} />
                                </ThemeIcon>
                                </Center>
                            }
                            />
                            <RingProgress
                            sections={[{ value: 20, color: "red" }]}
                            label={
                                <Text color="blue" weight={700} align="center" size="xl">
                                20%
                                </Text>
                            }
                            />
                        </>
                        </div>
                        <div style={{ display: "flex" }}>
                        <>
                            <RingProgress
                            sections={[{ value: 1, color: "red" }]}
                            label={
                                <Text color="red jn mm" weight={700} align="center" size="xl">
                                1%
                                </Text>
                            }
                            />

                            <RingProgress
                            sections={[{ value: 50, color: "skyblue" }]}
                            label={
                                <Center>
                                <ThemeIcon
                                    color="blue"
                                    variant="light"
                                    radius="xl"
                                    size="xl"
                                >
                                    <FcBarChart size={24} />
                                </ThemeIcon>
                                </Center>
                            }
                            />
                            <RingProgress
                            sections={[{ value: 80, color: "orange" }]}
                            label={
                                <Text color="blue" weight={700} align="center" size="xl">
                                80%
                                </Text>
                            }
                            />
                        </>
                        </div>
                    </div> */}
                  <div className="table" style={{ width: "100%", flex: "1" }}>
                    <div className="tableHead">
                      <div className="credit">
                        <h6>Total Credit</h6>
                      </div>
                      <div className="debit">
                        <h6>Total Debit</h6>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{ flex: "0.2" }}></div> */}
                </div>
                <br></br>
                <div className="description">
                  <div className="leftD" style={{ width: "50%" }}>
                    <div>
                      <InputFields
                        label={"Effective Date"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Loan Product"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Currency"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Facility Amount"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                  </div>
                  <div className="rightD" style={{ width: "50%" }}>
                    <div>
                      <InputFields
                        label={"Interest Type"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Principal Repay Freq."}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Interest Repay Freq."}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <InputFields
                        label={"Tenor (In Months)"}
                        inputWidth={"50%"}
                        labelWidth={"30%"}
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="btns">
                  <div>
                    <ButtonComponent
                      label={"Back"}
                      buttonBackgroundColor={"#eb7800"}
                      buttonColor={"white"}
                      buttonHeight={"40px"}
                      buttonWidth={"70px"}
                      onClick={navigateHome}
                    />
                  </div>
                  <div
                    className="bbb"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <ButtonComponent
                        label={"Send for Approval"}
                        buttonBackgroundColor={"black"}
                        buttonColor={"white"}
                        buttonHeight={"40px"}
                        buttonWidth={"150px"}
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        label={"Print"}
                        buttonBackgroundColor={"black"}
                        buttonColor={"white"}
                        buttonHeight={"40px"}
                        buttonWidth={"70px"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div style={{ flex: "0.2" }}></div>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default Loanapply;
