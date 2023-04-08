import React from "react";
import "./Loanfid.css";
import fid from "../assets/fiiiiid.png";
import { Button } from "@mantine/core";
import { HiHome } from "react-icons/hi";
import { Slider, RangeSlider, Checkbox } from "@mantine/core";
import InputField from "../components/fields/InputField";
import { fontSize } from "@mui/system";
import ButtonComponent from "../components/button/ButtonComponent";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MdCalculate, MdMessage } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { HiDocument, HiDocumentAdd } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { IoExit } from "react-icons/io5";

const Loanfid = () => {
  const navigate = useNavigate();

  const navigateToLoan = () => {
    // 👇️ navigate to /contacts
    navigate("/quo");
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/fid");
  };
  const navigateView = () => {
    // 👇️ navigate to /
    navigate("/loan");
  };

  return (
    <div className="main">
      <div className="nav">
        <div style={{ flex: "0.1" }}></div>
        <div style={{ flex: "0.8" }}>
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
                leftIcon={<GiReceiveMoney size="1rem" />}
              >
                Loan Application
              </Button>
            </div>
            <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<MdMessage size="1rem" />}
              >
                Messages
              </Button>
            </div>
            <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<HiDocument size="1rem" />}
              >
                Documents
              </Button>
            </div>
            <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<HiDocumentAdd size="1rem" />}
              >
                Start New Application
              </Button>
            </div>
            <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<AiFillEye size="1rem" />}
              >
                Review
              </Button>
            </div>
            <div>
              <Button
                variant="filled"
                color="orange"
                leftIcon={<IoExit size="1rem" />}
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>
      <br></br>
      <div className="mid">
        <div style={{ flex: "0.1" }}></div>
        <div className="content" style={{ flex: "0.8" }}>
          <div className="content1">
            <div style={{ borderBottom: "1px solid" }}>
              <h5>Loan Calculator</h5>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <h4>Personal Use</h4>
            </div>
            <br></br>
            <div
              style={{
                border: "none",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ flex: "0.2" }}>Loan Amount</div>
                <div style={{ flex: "0.5" }}>
                  <RangeSlider
                    color="orange"
                    marks={[
                      { value: 20, label: "20%" },
                      { value: 50, label: "50%" },
                      { value: 80, label: "80%" },
                    ]}
                  />
                  {/* <Slider
                    defaultValue={40}
                    marks={[{ value: 10 }, { value: 40 }, { value: 95 }]}
                  /> */}
                </div>
                <div
                  style={{
                    flex: "0.3",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ marginLeft: "50px" }}>
                    <InputField inputWidth={"60%"} disabled />
                  </div>
                  <div>GHC</div>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "30px" }}>
                <div style={{ flex: "0.2" }}>Duration</div>
                <div style={{ flex: "0.5" }}>
                  <RangeSlider
                    color="orange"
                    marks={[
                      { value: 20, label: "20%" },
                      { value: 50, label: "50%" },
                      { value: 80, label: "80%" },
                    ]}
                  />
                  {/* <Slider
                    defaultValue={40}
                    marks={[{ value: 10 }, { value: 40 }, { value: 95 }]}
                  /> */}
                </div>
                <div
                  style={{
                    flex: "0.3",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ marginLeft: "60px" }}>
                    <InputField inputWidth={"60%"} disabled={true} />
                  </div>
                  <div>Months</div>
                </div>
              </div>
              <br></br>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #cbd4d8",
                  borderRadius: "5px",
                  //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <div style={{ borderBottom: "2px solid orange" }}>
                  Optional loan conditions
                </div>

                <div style={{ marginTop: "10px" }}>
                  <Checkbox
                    label="Monthly net income is over 1000 GHC?"
                    color="orange"
                    size="md"
                  />
                </div>
              </div>
              <br></br>
              <div style={{ textAlign: "center" }}>
                {/* <ButtonComponent
                  label={"Calculate"}
                  buttonBackgroundColor="#ff932a"
                  buttonHeight={"50px"}
                  buttonColor="white"
                  buttonWidth={"200px"}
                /> */}
                <Button
                  variant="filled"
                  color="orange"
                  size="lg"
                  leftIcon={<MdCalculate size="1rem" />}
                >
                  Calculate
                </Button>
              </div>
            </div>
          </div>
          <br></br>
          <div className="content2">
            <div style={{ borderBottom: "1px solid" }}>
              <h5>Results</h5>
            </div>
            <br></br>
            <div
              style={{
                padding: "20px",
                border: "1px solid #cbd4d8",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <div style={{ borderBottom: "1px solid", display: "flex" }}>
                <div style={{ marginRight: "10px", marginTop: "-4px" }}>
                  <FaMoneyCheckAlt size={32} color={"#ff932a"} />
                </div>
                <div>
                  <h5>Personal loan GHC#1</h5>
                </div>
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"View Details"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#4ba3d3"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <div>
                    <div>Installment</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        38 GHC
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Annual Interest Rate</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>5.68%</h3>
                    </div>
                  </div>
                </div>
                {/* <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>APR</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        5.65%
                      </h3>
                    </div>
                  </div>
                </div> */}
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Total sum to be paid</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>2,280 GHC</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <ButtonComponent
                    label={"Apply"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#00bc4c"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                    onClick={navigateToLoan}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                border: "1px solid #cbd4d8",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                marginTop: "10px",
              }}
            >
              <div style={{ borderBottom: "1px solid", display: "flex" }}>
                <div style={{ marginRight: "10px", marginTop: "-4px" }}>
                  <FaMoneyCheckAlt size={32} color={"#ff932a"} />
                </div>
                <div>
                  <h5>Personal loan GHC#2</h5>
                </div>
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"View Details"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#4ba3d3"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                    onClick={navigateToLoan}
                  />
                </div>
                <div>
                  <div>
                    <div>Installment</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        78 GHC
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Annual Interest Rate</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>8.68%</h3>
                    </div>
                  </div>
                </div>
                {/* <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>APR</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        3.65%
                      </h3>
                    </div>
                  </div>
                </div> */}
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Total sum to be paid</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>2,580 GHC</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <ButtonComponent
                    label={"Apply"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#00bc4c"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                    onClick={navigateToLoan}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                border: "1px solid #cbd4d8",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                marginTop: "10px",
              }}
            >
              <div style={{ borderBottom: "1px solid", display: "flex" }}>
                <div style={{ marginRight: "10px", marginTop: "-4px" }}>
                  <FaMoneyCheckAlt size={32} color={"#ff932a"} />
                </div>
                <div>
                  <h5>Personal loan GHC#3</h5>
                </div>
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"View Details"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#4ba3d3"}
                    // buttonBackgroundColor={"orange"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                    onClick={navigateToLoan}
                  />
                </div>
                <div>
                  <div>
                    <div>Installment</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        39 GHC
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Annual Interest Rate</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>5.88%</h3>
                    </div>
                  </div>
                </div>
                {/* <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>APR</div>
                    <div>
                      <h3 style={{ fontWeight: "800px", color: "#4ba3d3" }}>
                        5.95%
                      </h3>
                    </div>
                  </div>
                </div> */}
                <div style={{ borderLeft: "1px solid" }}>
                  <div style={{ marginLeft: "5px" }}>
                    <div>Total sum to be paid</div>
                    <div>
                      <h3 style={{ fontWeight: "800px" }}>2,220 GHC</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <ButtonComponent
                    label={"Apply"}
                    buttonColor={"white"}
                    buttonBackgroundColor={"#00bc4c"}
                    // buttonBackgroundColor={"orange"}
                    buttonHeight={"50px"}
                    buttonWidth={"180px"}
                    onClick={navigateToLoan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Loanfid;
