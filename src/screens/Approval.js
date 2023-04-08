import React, { useState, useEffect } from "react";
import InputField from "../components/fields/InputField";
import ButtonComponent from "../components/button/ButtonComponent";
import ListOfValue from "../components/fields/ListOfValue";
import SelectField from "../components/fields/SelectField";
import HeaderComponent from "../components/header/HeaderComponent";
import { fontSize } from '@mui/system';

const Approval = () => {
  return (
    <div style={{ zoom: 1.2, backgroundColor: "white" }}>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            padding: "5px",
            border: "0.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <div style={{ flex: 0.25 }}>
            <InputField
              label={"Application Number"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              value={"015202273737382"}
              disabled
            />
          </div>
          <div style={{ flex: 0.2 }}>
            <InputField
              label={"Pep Status"}
              color={"red"}
              labelWidth={"40%"}
              value={"NO"}
              disabled
            />
          </div>
          <div style={{ flex: 0.2 }}>
            <InputField
              label={"Risk Status"}
              color={"red"}
              labelWidth={"40%"}
              value={"LOW RISK"}
              disabled
            />
          </div>
          <div style={{ flex: 0.1, marginTop: "3px" }}>
            <ButtonComponent
              label={"View Schedule"}
              buttonBackgroundColor={"orange"}
              buttonColor={"white"}
              buttonHeight={"35px"}
              buttonWidth={"140px"}
            />
          </div>
          <div style={{ flex: 0.25 }}>
            <InputField
              label={"Facility Number"}
              labelWidth={"40%"}
              inputWidth={"50%"}
              value={"SME005235353"}
              disabled
            />
          </div>
        </div>
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 0.6 }}>
            <div
              style={{
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Facility Type"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    value={"LOAN"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.25 }}>
                  <InputField
                    label={"Facility Type Category"}
                    labelWidth={"70%"}
                    inputWidth={"30%"}
                    value={"001"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  <InputField
                    inputWidth={"85%"}
                    disabled
                    value={"COMMERCIAL LOANS"}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Customer Number"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    value={"05523"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.6 }}>
                  <InputField
                    inputWidth={"85%"}
                    disabled
                    value={"GEORGE UNION91038"}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Disbursement Account"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    value={"0400"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    label={"Repayment Account"}
                    labelWidth={"40%"}
                    inputWidth={"42%"}
                    value={"0400"}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.3 }}>
                  <InputField
                    label={"Product Type"}
                    labelWidth={"70%"}
                    inputWidth={"25%"}
                    value={"55"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    inputWidth={"95%"}
                    disabled
                    value={"GEORGE UNION91038"}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Total Request Amount"}
                    labelWidth={"54%"}
                    inputWidth={"45%"}
                    value={"2,000,000.00"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField
                    label={"Number of Tranches"}
                    labelWidth={"60%"}
                    inputWidth={"35%"}
                    value={"0"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  <InputField
                    label={"No. of Disbursed Acc"}
                    labelWidth={"70%"}
                    inputWidth={"35%"}
                    value={"0"}
                    disabled
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Total Amount Disbursed"}
                    labelWidth={"54%"}
                    inputWidth={"45%"}
                    value={".00"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField
                    label={"No. of Tranches Disbursed"}
                    labelWidth={"60%"}
                    inputWidth={"35%"}
                    value={"0"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.3 }}>
                  {/* <InputField
                    label={"No. of Disbursed Acc"}
                    labelWidth={"70%"}
                    inputWidth={"35%"}
                    value={"0"}
                    disabled
                  /> */}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Amount Due"}
                    labelWidth={"54%"}
                    inputWidth={"45%"}
                    value={"2,000,000.00"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField
                    label={"No. of Tranches Due"}
                    labelWidth={"60%"}
                    inputWidth={"35%"}
                    value={"0"}
                    disabled
                  />
                </div>
                <div style={{ flex: 0.3, textAlign: "right" }}>
                  <ButtonComponent
                    label={"View Accounts"}
                    buttonBackgroundColor={"orange"}
                    buttonColor={"white"}
                    buttonHeight={"35px"}
                    buttonWidth={"140px"}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <div style={{ display: "flex" }}>
                  <div>
                    <InputField
                      label={"Individual Score"}
                      labelWidth={"60%"}
                      inputWidth={"35%"}
                      value={"15"}
                      disabled
                    />
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <ButtonComponent
                      label={"View Details"}
                      buttonBackgroundColor={"orange"}
                      buttonColor={"white"}
                      buttonHeight={"30px"}
                      buttonWidth={"140px"}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <SelectField
                    label={"Settle All Facility"}
                    labelWidth={"70%"}
                    inputWidth={"30%"}
                    lovdata={[
                      { label: "Yes", value: "Y" },
                      { label: "No", value: "N" },
                    ]}
                    disabled
                  />
                </div>
                <div></div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div>
                <InputField
                  label={"Loan Account Number"}
                  labelWidth={"20%"}
                  inputWidth={"25%"}
                  value={"15"}
                  disabled
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    type={"date"}
                    label={"Loan Effective Date"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                  />
                </div>
                <div style={{ flex: 0.5 }}>
                  <InputField
                    type={"date"}
                    label={"Next Review Date"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                backgroundColor: "#faf1e7",
                width: "40%",
              }}
            >
              <div style={{}}>
                <SelectField
                fontWeight={'400px'}
                fontSize='25px'
                  label={"Authorize"}
                  labelWidth={"52%"}
                  inputWidth={"40%"}
                  lovdata={[
                    { label: "APPROVE", value: "001" },
                    { label: "RETURN", value: "002" },
                  ]}
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 0.4 }}>
            <div
              style={{
                flex: "0.5",
                padding: "10px",
                border: "none",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "1px solid #cbd4d8",
              }}
            >
              <div style={{ borderBottom: "1px solid" }}>
                <h6>Loan Plan</h6>
              </div>
              {/* <div style={{ marginTop: "20px", display: "flex", flex: 1 }}>
              <div style={{ flex: 0.34 }}>
                <Label label={"Interest Rate"} fontSize={"85%"} />
              </div>
              <div style={{ flex: 0.2 }}>
                <InputField inputWidth={"90%"} />
              </div>
              <div style={{ flex: 0.2 }}>
                <InputField inputWidth={"90%"} />
              </div>
            </div> */}
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Rate"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  value={"1.668"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Type"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  value={"01 - FLAT"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Principal Repay Frequency"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  value={"MONTHLY"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Repay Frequency"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  value={"MONTHLY"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Tenor (Months)"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  value={"12"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"With Interest?"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  value={"N"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Balloon Installment"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  value={"0"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Moratorium Period"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  value={"0"}
                  disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <SelectField
                  label={"Last Working Day"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  lovdata={[
                    { label: "Yes", value: "Y" },
                    { label: "No", value: "N" },
                  ]}
                />
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                border: "none",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                backgroundColor: "white",
                borderRadius: "5px",
                border: "1px solid #cbd4d8",
                marginTop: "10px",
              }}
            >
              <div style={{ borderBottom: "1px solid" }}>
                <h6>View Other Details</h6>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"Borrower Details"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Guarantors"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Financials"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"Documents"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Bureau"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Collateral"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <ButtonComponent
                    label={"Add Comment"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"View Comments"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Tranches"}
                    buttonBackgroundColor={"black"}
                    buttonColor={"white"}
                    buttonHeight={"40px"}
                    buttonWidth={"180px"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval;
