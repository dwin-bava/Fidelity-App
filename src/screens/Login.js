import React, { useState } from "react";
import InputField from "../components/fields/InputField";
import fid from "../assets/fiiiiid.png";
import { Button } from "@mantine/core";
import { HiHome } from "react-icons/hi";
import { Slider, RangeSlider, Checkbox } from "@mantine/core";
import ButtonComponent from "../components/button/ButtonComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdCalculate, MdMessage } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { HiDocument, HiDocumentAdd } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { IoExit, IoLocationSharp } from "react-icons/io5";
import { Input } from "@mantine/core";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import {BsKeyboard} from 'react-icons/bs'

function Login() {
  const navigate = useNavigate();
  const [username , setUsername] = useState("")

  const navigateToLoan = () => {
    // 👇️ navigate to Loan Quotation
    navigate("/quo");
  };

  const handleLogin = ()=>{
    if(username === "master"){
navigate("/enq")
    }else{
navigate("/quo");
    }
  }

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/fid");
  };
  const navigateToEnquiry = () => {
    // 👇️ navigate to /
    navigate("/enq");
  };
  return (
    <div className="loglog">
      <div className="nav" style={{ height: "80px" }}>
        <div style={{ flex: "0.1" }}></div>
        <div style={{ flex: "0.8" }}>
          <div className="nav1" style={{ borderBottom: "none" }}>
            <div className="logo">
              <img src={fid} height="60px" width={"250px"} alt="" />
            </div>
          </div>
          {/* <div className="nav2">
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
          </div> */}
        </div>
        <div style={{ flex: "0.1" }}></div>
      </div>
      <br></br>
      <br></br>
      {/* <br></br> */}
      <div className="mid">
        <div style={{ flex: "0.4" }}></div>
        <div className="" style={{ flex: "0.5" }}>
          <div
            className="logbg"
            style={{
              padding: "20px",
              border: "none",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2>Sign In</h2>
            </div>
            <br></br>
            <div>
              {/* <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Enter your Username"
                description="This is the username you chose when registering for Online Banking"
                error="Your credit card expired"
                size="xl"
              >
                <Input id="input-demo" placeholder="Username" />
              </Input.Wrapper> */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5>Enter your username</h5>
                </div>
                <div>
                  <AiOutlineQuestionCircle size={25} />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px", marginTop: "-4px" }}>
                  <BsExclamationCircle color="#ff932a" />
                </div>
                <div>
                  <h6 style={{ color: "grey" }}>
                    This is the username you chose when registering for Online
                    Banking
                  </h6>
                </div>
              </div>
              <div>
                <input className="inp" onChange={(e)=>setUsername(e.target.value)} style={{ width: "100%" }}></input>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              {/* <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Enter your Password"
                description="This is the username you chose when registering for Online Banking"
                error="Your credit card expired"
                size="xl"
              >
                <Input id="input-demo" placeholder="Password" />
              </Input.Wrapper> */}
              <div>
                <h5>Enter your password</h5>
              </div>
              <div>
                <input className="inp" type={'password'} style={{ width: "100%" }}></input>
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
                <Checkbox label="Remember me" color="orange" size="md" />
              </div>
              <div style={{ marginTop: "3px" }}>
                <h6>Forgot username?</h6>
              </div>
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "10px", marginTop: "-10px" }}>
                <BsKeyboard size={25} />
              </div>
              <div>
                <h6>Use Virtual Keyboard</h6>
              </div>
            </div>
            <br></br>
            {/* <br></br> */}
            <div
              style={{
                textAlign: "center",
                borderBottom: "1px solid #cbd4d8",
                paddingBottom: "25px",
              }}
            >
              <ButtonComponent
                label={"Sign in"}
                // buttonBackgroundColor={"#00b0ec"}
                buttonBackgroundColor={"#ff932a"}
                buttonColor={"white"}
                buttonHeight={"50px"}
                buttonWidth={"250px"}
                onClick={handleLogin}
              />
            </div>
            <br></br>
            <div style={{ display: "flex" }}>
              <div>
                <h6>Not Registered?</h6>
              </div>
              <div style={{ marginLeft: "10px", marginTop: "-5px" }}>
                <AiOutlineRight color="#ff932a" />
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "0.4" }}></div>
      </div>
      <div style={{}}>
        <div
          style={{
            height: "55px",
            backgroundColor: "grey",
            marginTop: "62px",
            display: "flex",
          }}
        >
          <div style={{ flex: "0.1" }}></div>
          <div style={{ flex: "0.8" }}>
            <div
              style={{
                padding: "20px",
                display: "flex",
              }}
            >
              <div style={{ display: "flex", color: "white" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "-4px" }}>
                    <BsFillTelephoneFill size={17} />
                  </div>
                  <div style={{ marginLeft: "8px" }}>
                    <h6>Customer Service</h6>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", color: "white", marginLeft: "50px" }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "-4px" }}>
                    <IoLocationSharp size={17} />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h6>Find a Wealth Center</h6>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", color: "white", marginLeft: "50px" }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "-4px" }}>
                    <RiMessage2Fill size={17} />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <h6>Customer Feedback</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "0.1" }}></div>
        </div>
      </div>
      <div>
        <div
          style={{
            height: "67px",
            backgroundColor: "#3d3d41",
            display: "flex",
          }}
        >
          <div style={{ flex: "0.1" }}></div>
          <div style={{ flex: "0.8" }}>
            <div style={{ display: "flex", padding: "10px", color: "white" }}>
              <div style={{ display: "flex", flex: "0.65" }}>
                <div>
                  <h6>About</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Careers</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Privacy</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Security</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Terms & Conditions</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Site Map</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Accessibility</h6>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <h6>Group</h6>
                </div>
              </div>
              <div style={{ flex: "0.35" }}>
                <div style={{}}>
                  <h6>
                    @ Fidelity Bank Ghana Limited 2023. All Rights Reserved.
                  </h6>
                </div>
                {/* <div style={{ marginTop: "10px" }}>
                  <h6>Member FDIC.</h6>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <h6>Equal Housing Lender</h6>
                </div> */}
              </div>
            </div>
          </div>
          <div style={{ flex: "0.1" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
