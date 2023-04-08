import React, { useState, useEffect } from "react";
import ListOfValue from "../fields/ListOfValue";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import Label from "../label/Label";
import DataTable from "../data-table/DataTable";
import HeaderComponent from "../header/HeaderComponent";
import { Radio, Group } from "@mantine/core";
import ButtonComponent from "../button/ButtonComponent";
import { Button } from "@mantine/core";
import axios from "axios";
import swal from "sweetalert";
// import Swal from "sweetalert2";
import { API_SERVER } from "../../config/constant";
import { Modal } from "react-bootstrap";

function ArrowStepper() {
  const options = { rowsPerPage: 3 };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [resultsIn, setResultsIn] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [applicantName, setApplicantName] = useState();
  const [netMonthlyIncomeSlashSalary, setNetMonthlyIncomeSlashSalary] =
    useState(1);
  const [debtServiceRatio, setDebtServiceRatio] = useState();

  const [allLoanProducts, setAllLoanProducts] = useState([]);
  const [loanProduct, setLoanProduct] = useState();

  const [allInterestType, setAllInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);

  // const [dat, setDat] = useState();
  const [facilityNumber, setFacilityNumber] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  //   const [currency, setCurrency] = useState(0);
  const [facilityAmount, setFacilityAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenorInMonths, setTenorInMonths] = useState("");
  const [exemptMonth, setExemptMonth] = useState();
  const [withInterest, setWithInterest] = useState();
  const [lastWorkingDay, setLastWorkingDay] = useState();
  const [expiryDate, setExpiryDate] = useState();

  const [allPrincipalRepaymentFrequency, setAllPrincipalRepaymentFrequency] =
    useState([]);
  const [principalRepaymentFrequency, setPrincipalRepaymentFrequency] =
    useState();

  const [allInterestRepaymentFrequency, setAllInterestRepaymentFrequency] =
    useState([]);

  const [interestRepaymentFrequency, setInterestRepaymentFrequency] =
    useState();

  const [principalRepaymentCount, setPrincipalRepaymentCount] = useState(0);
  const [interestRepaymentCount, setInterestRepaymentCount] = useState(0);
  const [moratoriumPeriod, setMoratorium] = useState(0);
  const [moratoriumInterest, setMoratoriumInterest] = useState("");
  //   const [lastWorkingDay, setLastWorkingDay] = useState("");

  const [balloonInstallment, setBalloonInstallment] = useState("");
  const [firstRepaymentDate, setFirstRepaymentDate] = useState("");
  const [processingFees, setProcessingFees] = useState("");
  const [balloonInstallmentNumber, setBalloonInstallmentNumber] = useState("");
  const [lastRepaymentDate, setLastRepaymentDate] = useState("");
  const [legalForm, setLegalForm] = useState("");

  const [data, setData] = useState([]);

  // console.log(
  //   facilityNumber +
  //     "," +
  //     effectiveDate +
  //     ", " +
  //     currency +
  //     "," +
  //     facilityAmount +
  //     "," +
  //     interestRate +
  //     "," +
  //     tenorInMonths +
  //     "," +
  //     exemptMonth +
  //     "," +
  //     principalRepaymentFrequency +
  //     "," +
  //     interestRepaymentFrequency +
  //     "," +
  //     principalRepaymentCount +
  //     "," +
  //     interestRepaymentCount +
  //     "," +
  //     moratoriumPeriod +
  //     "," +
  //     moratoriumInterest +
  //     "," +
  //     lastWorkingDay +
  //     "," +
  //     interestType +
  //     "," +
  //     balloonInstallment +
  //     "," +
  //     firstRepaymentDate +
  //     "," +
  //     processingFees +
  //     "," +
  //     balloonInstallmentNumber +
  //     "," +
  //     lastRepaymentDate +
  //     "," +
  //     legalForm
  // );

  const [quotationNumber, setQuotationNumber] = useState(null);

  useEffect(() => {
    async function getQuotationNumber() {
      let response = await fetch(API_SERVER + "/get-unique-ref");
      response = await response.json();
      setQuotationNumber(response[0]["unique_ref"]);
      //   console.log(response[0]["unique_ref"]);
    }

    getQuotationNumber();
  }, []);

  useEffect(() => {
    async function getLoanProducts() {
      let response = await fetch(API_SERVER + "/get-loan-products");
      response = await response.json();
      setAllLoanProducts(response);
      //   console.log(response);
    }

    async function getCurrency() {
      let response = await fetch(API_SERVER + "/get-currency");
      response = await response.json();
      setCurrency(response);
      //   console.log(response);
    }

    async function getInterestType() {
      let response = await fetch(API_SERVER + "/get-interest-type");
      response = await response.json();
      setAllInterestType(response);
      //   console.log(response);
    }

    async function getPrincipalRepaymentFrequency() {
      let response = await fetch(
        API_SERVER + "/get-principal-repayment-frequency"
      );
      response = await response.json();
      setAllPrincipalRepaymentFrequency(response);
      //   console.log(response);
    }

    async function getInterestRepaymentFrequency() {
      let response = await fetch(
        API_SERVER + "/get-interest-repayment-frequency"
      );
      response = await response.json();
      setAllInterestRepaymentFrequency(response);
      //   console.log(response);
    }

    getInterestRepaymentFrequency();
    getPrincipalRepaymentFrequency();
    getInterestType();
    getCurrency();
    getLoanProducts();
  }, []);

  const handleApplicantNameChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setApplicantName(value);
  };

  const handleLoanProductChange = (value) => {
    setLoanProduct(value);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  };

  const handleInterestType = (value) => {
    setInterestType(value);
  };

  const handlePrincipalRepaymentFrequency = (value) => {
    setPrincipalRepaymentFrequency(value);
  };

  const handleInterestRepaymentFrequency = (value) => {
    setInterestRepaymentFrequency(value);
  };

  console.log(interestRepaymentFrequency, "interest frequencies");

  console.log(principalRepaymentFrequency, "freq");

  console.log(interestType, "int");
  console.log(loanProduct, selectedCurrency);

  const handleNetMonthlyIncomeSalaryChange = (event) => {
    const value = event.target.value;
    setNetMonthlyIncomeSlashSalary(value);
  };

  const handleEffectiveDateChange = (value) => {
    // const value = event.target.value;
    setEffectiveDate(value);
    console.log(effectiveDate, "sss");
  };

  const handleFacilityNumberChange = (event) => {
    // const value = event.target.value;

    setFacilityNumber(event.target.value);
    console.log(facilityNumber, "facility");
  };

  const handleInterestRateChange = (event) => {
    const value = event.target.value;
    console.log(value);

    setInterestRate(value);
  };

  const handleTenorInMonthsChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setTenorInMonths(value);
  };

  //   exempt month
  const handleChangeExemptMonths = (value) => {
    setExemptMonth(value);
  };
  //   console.log(exemptMonth,"month")

  // with interest
  const handleChangeWithInterest = (value) => {
    setWithInterest(value);
  };
  //   console.log(withInterest, "interest");

  //  last working day
  const handleChangeLastWorkingDay = (value) => {
    setLastWorkingDay(value);
  };
  //   console.log(lastWorkingDay, "last working day");

  async function postLoanScheduleEnquiry() {
    const netMonthlyIncomeSalary = "";
    const facilityNumber = "";
    if (document.getElementById("quotationNumber")) {
      facilityNumber = document.getElementById("quotationNumber").value;
      return alert("am here now..");
    }
    const applicantName = "";
    if (document.getElementById("applicantName")) {
      applicantName = document.getElementById("applicantName").value;
    }
    if (document.getElementById("netMonthlyIncomeSalary")) {
      netMonthlyIncomeSalary = document.getElementById(
        "netMonthlyIncomeSalary"
      ).value;
    }
    // const effectiveDate = '';
    if (document.getElementById("effectiveDate")) {
      effectiveDate = document.getElementById("effectiveDate").value;
    }
    // const applicantName = document.getElementById("applicantName").value;
    // const netMonthlyIncomeSalary = document.getElementById(
    //   "netMonthlyIncomeSalary"
    // ).value;
    // const effectiveDate = document.getElementById("effectiveDate").value;
    console.log();
    const eDate = new Date(effectiveDate);
    const effective_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    // return console.log(loanProduct);
    // return console.log(selectedCurrency);

    // const facilityAmount = document.getElementById("facilityAmount")?.value;
    // const interestRate = document.getElementById("interestRate")?.value;
    // const tenorInMonths = document.getElementById("tenorInMonths")?.value;

    // return console.log(exemptMonth);

    if (document.getElementById("principalRepaymentFrequency")) {
      const principalRepaymentFrequency = document.getElementById(
        "principalRepaymentFrequency"
      ).value;
    }
    if (document.getElementById("interestRepaymentFrequency")) {
      const interestRepaymentFrequency = document.getElementById(
        "interestRepaymentFrequency"
      ).value;
    }
    if (document.getElementById("principalRepaymentCount")) {
      const principalRepaymentCount = document.getElementById(
        "principalRepaymentCount"
      ).value;
    }
    if (document.getElementById("interestRepaymentCount")) {
      const interestRepaymentCount = document.getElementById(
        "interestRepaymentCount"
      ).value;
    }
    if (document.getElementById("moratoriumPeriod")) {
      const moratoriumPeriod =
        document.getElementById("moratoriumPeriod").value;
    }
    if (document.getElementById("moratoriumInterest")) {
      const moratoriumInterest =
        document.getElementById("moratoriumInterest").value;
    }
    if (document.getElementById("lastWorkingDay")) {
      const lastWorkingDay = document.getElementById("lastWorkingDay").value;
    }
    if (document.getElementById("interestType")) {
      const interestType = document.getElementById("interestType").value;
    }
    if (document.getElementById("balloonInstallment")) {
      const balloonInstallment =
        document.getElementById("balloonInstallment").value;
    }
    if (document.getElementById("firstRepaymentDate")) {
      const firstRepaymentDate =
        document.getElementById("firstRepaymentDate").value;
    }
    if (document.getElementById("processingFees")) {
      const processingFees = document.getElementById("processingFees").value;
    }
    if (document.getElementById("balloonInstallmentNumber")) {
      const balloonInstallmentNumber = document.getElementById(
        "balloonInstallmentNumber"
      ).value;
    }
    if (document.getElementById("lastRepaymentDate")) {
      const lastRepaymentDate =
        document.getElementById("lastRepaymentDate").value;
    }
    // if (document.getElementById("legalForm")) {
    //   const legalForm = document.getElementById("legalForm").value;
    // }

    console.log(
      {
        facility_number: quotationNumber,
        interest_rate: interestRate,
        facility_amount: facilityAmount,
        principal_moratorium: moratoriumPeriod,
        interest_moratorium: moratoriumInterest,
        loan_tenor_in_months: tenorInMonths,
        effective_date: effective_date,
        interest_type: interestType,
        principal_repayment_frequency: principalRepaymentFrequency,
        principal_repayment_count: principalRepaymentCount,
        schedule_start_date: effectiveDate,
        processing_fees: processingFees,
        last_working_day_of_the_month: lastWorkingDay,
        interest_repayment_frequency: interestRepaymentFrequency,
        interest_repayment_count: interestRepaymentCount,
        ballon_installment_to_be_applied: balloonInstallment,
        ballon_on_installment_number: balloonInstallmentNumber,
        first_principal_repay_date: firstRepaymentDate,
        last_repayment_date: lastRepaymentDate,
        legal_form: legalForm,
        currency: selectedCurrency,
        exempt_month: exemptMonth,
        net_monthly_income: netMonthlyIncomeSalary,
      },
      "cool things.."
    );

    if (
      interestRate === "" ||
      facilityAmount === "" ||
      tenorInMonths === "" ||
      effectiveDate === "" ||
      interestType === "" ||
      principalRepaymentFrequency === "" ||
      // principalRepaymentCount === "" ||
      // effectiveDate === "" ||
      // processingFees === "" ||
      interestRepaymentFrequency === "" ||
      // interestRepaymentCount === "" ||
      // firstRepaymentDate === "" ||
      // lastRepaymentDate === "" ||
      // legalForm === "" ||
      selectedCurrency === ""
    ) {
      swal({
        title: "All Fields Are Required",
        text: "Please fill all the fields",
        icon: "warning",
        button: "Ok",
      }).then((result) => {
        // Do something here..
        // document.getElementById("postBTN").disabled = false;
      });
    } else {
      await axios
        .post(API_SERVER + "/loan-schedule-quotation", {
          facility_number: quotationNumber,
          interest_rate: interestRate,
          facility_amount: facilityAmount,
          principal_moratorium: moratoriumPeriod,
          interest_moratorium: moratoriumInterest,
          loan_tenor_in_months: tenorInMonths,
          effective_date: effective_date,
          interest_type: interestType,
          principal_repayment_frequency: principalRepaymentFrequency,
          principal_repayment_count: principalRepaymentCount,
          schedule_start_date: effective_date,
          processing_fees: processingFees,
          last_working_day_of_the_month: lastWorkingDay,
          interest_repayment_frequency: interestRepaymentFrequency,
          interest_repayment_count: interestRepaymentCount,
          ballon_installment_to_be_applied: balloonInstallment,
          ballon_on_installment_number: balloonInstallmentNumber,
          first_principal_repay_date: firstRepaymentDate,
          last_repayment_date: lastRepaymentDate,
          legal_form: legalForm,
          currency: selectedCurrency,
          exempt_month: exemptMonth,
          net_monthly_income: netMonthlyIncomeSalary,
        })
        .then(function (response) {
          console.log(response);

          console.log(response.data[0].responseCode);

          if (response.data[0].responseCode === "000") {
            // swal({
            //   title: "",
            //   text: response.data[0].responseMessage,
            //   icon: "success",
            //   button: "Ok",
            // })
            swal({
              //   position: 'top-end',
              icon: "success",
              text: response.data[0].responseMessage,
              title: "",
              button: false,
              
              timer: 1000,
            }).then((result) => {
              setResultsIn(true);
              // Do something here..
              // document.getElementById("postBTN").disabled = false;

              loanScheduleEnquiry();

              getExtraLoanInfo();
            });
          }

          console.log({ data });
          async function loanScheduleEnquiry() {
            await axios
              .post(API_SERVER + "/loan-schedule-enquiry", {
                facility_number: quotationNumber,
              })
              .then(function (response) {
                // let data = response;
                // console.log(response.data.responseMessage);

                console.log(quotationNumber, "quotationNumber");

                let resp = response.data.responseMessage;

                let details = [];

                for (let i = 0; i < resp.length; i++) {
                  const repay_seq_no = resp[i].repay_seq_no;

                  const date_due = resp[i].date_due;

                  const dDue = new Date(date_due);
                  const dateDue = dDue
                    .toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, "-");

                  const principal = resp[i].principal;
                  const interest = resp[i].interest;
                  const cum_p = resp[i].cum_p;

                  details.push([
                    repay_seq_no,
                    dateDue,
                    principal,
                    interest,
                    cum_p,
                  ]);
                }
                // setClick(true);
                setIsModalOpen(true);
                setData(details);
              });
          }

          // Get DSR
          async function getExtraLoanInfo() {
            let resp = await axios
              .post(API_SERVER + "/get-extra-loan-info", {
                facility_number: quotationNumber,
                net_monthly_salary: netMonthlyIncomeSlashSalary,
              })
              .then(function (response) {
                // console.log
                if (response) {
                  let resp1 = response.data.responseMessage;
                  console.log(response, "am dey here some..");
                  setDebtServiceRatio(resp1[0].dsr);
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const [checked, setChecked] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (index) => {
    setActiveStep(index);
  };

  const steps = [
    {
      count: 1,
      number: "General",
      content: (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div
              style={{
                padding: "5px",
                border: "0.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "5px",
                width: "25%",
                backgroundColor: "white",
              }}
            >
              <div>
                <InputField
                  label={"Quotation Number"}
                  labelWidth={"50%"}
                  id="quotationNumber"
                  value={quotationNumber}
                  disabled
                />
              </div>
            </div>
          </div>
          <br />

          <div style={{ display: "flex", gap: "10px" }}>
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
              <div>
                <InputField
                  type={"date"}
                  label={"Effective Date"}
                  labelWidth={"30%"}
                  inputWidth={"33%"}
                  required
                  id="effectiveDate"
                  onChange={handleEffectiveDateChange}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Loan Product"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  onChange={handleLoanProductChange}
                  lovdata={allLoanProducts}
                  id="loanProduct"
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <SelectField
                  label={"Currency"}
                  labelWidth={"30%"}
                  inputWidth={"30%"}
                  lovdata={currency}
                  onChange={handleCurrencyChange}
                  required
                  id="currency"
                  // disabled
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Facility Amount"}
                  labelWidth={"30%"}
                  inputWidth={"30%"}
                  // onChange={handleFacilityNumberChange}
                  onChange={(e) => {
                    setFacilityAmount(e.target.value);
                    console.log(facilityAmount, "fsfsfs");
                  }}
                  required
                  // value={facilityNumber}
                  id="facilityAmount"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Intro Source"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Purpose"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Sector"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Sub Sector"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Sales/Intro Staff"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required
                />
              </div>
              {/* <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Rate"}
                  labelWidth={"30%"}
                  inputWidth={"15%"}
                />
              </div> */}
            </div>
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
                  onChange={handleInterestRateChange}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Interest Type"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  lovdata={allInterestType}
                  onChange={handleInterestType}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Principal Repay Frequency"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  onChange={handlePrincipalRepaymentFrequency}
                  lovdata={allPrincipalRepaymentFrequency}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <ListOfValue
                  label={"Interest Repay Frequency"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  onChange={handleInterestRepaymentFrequency}
                  lovdata={allInterestRepaymentFrequency}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Tenor (Months)"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  onChange={handleTenorInMonthsChange}
                  required
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <SelectField
                  label={"Last Working Day"}
                  labelWidth={"35%"}
                  inputWidth={"15%"}
                  onChange={handleChangeLastWorkingDay}
                  id="lastWorkingDay"
                  lovdata={[
                    { label: "Yes", value: "Y" },
                    { label: "No", value: "N" },
                  ]}
                />
              </div>
              {/* <div style={{ marginTop: "10px" }}>
              <DataTable columns={["Charges", "%", "Fee Amount"]} />
            </div> */}
            </div>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{}}>
                {/* <ButtonComponent
                  label={"Save"}
                  buttonBackgroundColor={"black"}
                  buttonColor={"white"}
                  buttonHeight={"40px"}
                  buttonWidth={"70px"}
                  onClick={postLoanScheduleEnquiry}
                /> */}
              </div>
              <div>
                <ButtonComponent
                  label={"View Schedule"}
                  buttonBackgroundColor={"black"}
                  buttonColor={"white"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  // onClick={handleButtonClick}
                  onClick={postLoanScheduleEnquiry}
                  // onClick={handleViewSchedule}
                />
              </div>
            </div>
          </div>
          <div>
            {isModalOpen && (
              <Modal
                show={isModalOpen}
                onHide={handleCloseModal}
                size="xl"
                backdropClassName="modal-backk"
                options={options}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Loan Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DataTable
                    columns={[
                      "Seq Number",
                      "Due Date",
                      "Principal",
                      "Interest",
                      "Payment",
                    ]}
                    data={data}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
          
          {click ? (
            <div>
              <DataTable
                columns={[
                  "Seq Number",
                  "Due Date",
                  "Principal",
                  "Interest",
                  "Payment",
                ]}
                data={data}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      count: 2,
      number: "Statistics",
      content: (
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div style={{ backgroundColor: "white" }}>
                <DataTable
                  columns={[
                    "Income Details (Individual)",
                    "Income Amount",
                    "Amount to Consider",
                  ]}
                />
                {/* <div
                  style={{
                    display: "flex",
                    backgroundColor: "#ffdc9c",
                    padding: "8px",
                    // overflowY:'auto',
                    // height:'100px'
                  }}
                >
                  <div style={{ flex: 0.5 }}>Income Details (Individual)</div>
                  <div style={{ flex: 0.25 }}>Income Amount</div>
                  <div style={{ flex: 0.25 }}>Amount to Consider</div>
                </div>
                <div style={{overflowY:'scroll', height:"100px"}}>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <div style={{ flex: 0.47 }}>
                      <ListOfValue inputWidth={"80%"} />
                    </div>
                    <div style={{ flex: 0.26 }}>
                      <InputField />
                    </div>
                    <div style={{ flex: 0.25 }}>
                      <InputField />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.47 }}>
                      <ListOfValue inputWidth={"80%"} />
                    </div>
                    <div style={{ flex: 0.26 }}>
                      <InputField />
                    </div>
                    <div style={{ flex: 0.25 }}>
                      <InputField />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.47 }}>
                      <ListOfValue inputWidth={"80%"} />
                    </div>
                    <div style={{ flex: 0.26 }}>
                      <InputField />
                    </div>
                    <div style={{ flex: 0.25 }}>
                      <InputField />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div>
                <DataTable
                  columns={["Asset Details (Individuals)", "Amount"]}
                />
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div>
                <DataTable
                  columns={[
                    "Expenditure and Other Contributions (Individual)",
                    "Amount",
                  ]}
                />
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div>
                <DataTable
                  columns={["Liability Details (Individuals)", "Amount"]}
                />
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div>
                <DataTable
                  columns={[
                    "Facility Type",
                    "Account Number",
                    "CCY",
                    "Facility Amount",
                    "Installment",
                    "Expiry Date",
                  ]}
                />
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div>
                <DataTable
                  columns={[
                    "Bank Code",
                    "Amount Granted",
                    "Monthly Amount",
                    "Date Granted",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      count: 3,
      number: "Employment",
      content: (
        <div>
          <div>
            <HeaderComponent
              title={"Employment Details"}
              backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <div
              style={{
                flex: 0.6,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <SelectField
                  label={"Employment Category"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <ListOfValue
                  label={"Employment Type"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Employer"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Others"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Position Held"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Employed Since"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Commencement"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Exited"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Address 1"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Address 2"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Email Address"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.4,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <InputField
                  label={"Phone 1"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Phone 2"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Location"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <ListOfValue
                  label={"City"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "-5px" }}>
                  <Label label={"Fixed Term Contract"} />
                </div>
                <div style={{ marginLeft: "30px", marginTop: "-15px" }}>
                  <Radio.Group>
                    <Group mt="xs">
                      <Radio value="yes" label="Yes" color={"orange"} />
                      <Radio value="no" label="No" color={"orange"} />
                    </Group>
                  </Radio.Group>
                </div>
              </div>
              <div>
                <InputField
                  label={"Employment Number"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Department"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Salary Day"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Fax Number"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Landmark"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <br />
              <div style={{ textAlign: "right" }}>
                <ButtonComponent
                  label={"Save"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"100px"}
                  buttonColor={"white"}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      count: 4,
      number: "Guarantors",
      content: (
        <div>
          <div>
            <HeaderComponent
              title={"Guarantors"}
              backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <SelectField
                  label={"Guarantor Type"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Account with Bank"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Name"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <ListOfValue
                  label={"Guarantor's ID Type"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"ID Number"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"ID Issue Date"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"ID Expiry Date"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Relation to Borrower"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Incorperation/Birth"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Place of Birth"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <InputField
                  label={"Residential Address / Business Location"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Postal / Digital Address"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Residence Since"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Phone Number"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Occupation / Employer"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Residential Address / Business Location"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Employed Since"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Position"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"End of Service Benefit"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Net Monthly Income"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Email"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ButtonComponent
                label={"Add Comments"}
                buttonBackgroundColor={"black"}
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Clear"}
                buttonBackgroundColor={"black"}
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Save"}
                buttonBackgroundColor={"black"}
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Send Email"}
                buttonBackgroundColor={"black"}
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Send SMS"}
                buttonBackgroundColor={"black"}
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
          </div>
          <br />
          <div>
            <DataTable
              columns={[
                "Guarantor's ID Applicant Number",
                "Guarantor's Name",
                "Postal Address",
                "Guarantor Contact",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      count: 5,
      number: "Document",
      content: (
        <div>
          <div>
            <DataTable
              columns={[
                "Seq Number",
                "Document Type",
                "Presented Document",
                "Scan Document Number",
                "Scan Date",
                "Document Expiry Date",
                "Mand",
                "Received Date",
              ]}
            />
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.2 }}></div>
            <div style={{ display: "flex", flex: 0.6, gap: "40px" }}>
              <div>
                <ButtonComponent
                  label={"Add Comments"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Add Other Documents"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"200px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Account Creation Document Details"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"290px"}
                  buttonColor={"white"}
                />
              </div>
            </div>
            <div style={{ flex: 0.2 }}></div>
          </div>
        </div>
      ),
    },
    {
      count: 6,
      number: "Collateral",
      content: (
        <div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              backgroundColor: "white",
            }}
          >
            <div style={{ flex: 0.7 }}>
              <div>
                <ListOfValue
                  label={"Collateral Number"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Total Amount"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Collateral Amount"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Amount Available to Use"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Amount Utilized"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.3,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                height: "120px",
                border: "0.5px solid #e0dfe0",
                marginTop: "35px",
              }}
            >
              <div>
                <InputField
                  label={"Coverage %"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Loan Amount"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              backgroundColor: "white",
              border: "0.5px solid #e0dfe0",
              marginTop: "15px",
            }}
          >
            <div>
              <InputField
                label={"Loan Percentage Coverage"}
                labelWidth={"55%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Amount to be Utilized"}
                labelWidth={"55%"}
                inputWidth={"50%"}
              />
            </div>
            <div>
              <InputField
                label={"Amount Available"}
                labelWidth={"55%"}
                inputWidth={"50%"}
                disabled
              />
            </div>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.2 }}></div>
            <div style={{ flex: 0.6, display: "flex", gap: "30px" }}>
              <div>
                <ButtonComponent
                  label={"Add Comments"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Add Other Comments"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"200px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Save"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"100px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Clear Record"}
                  buttonBackgroundColor={"black"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
            </div>
            <div style={{ flex: 0.2 }}></div>
          </div>
          <br />
          <div>
            <DataTable
              columns={[
                "Sr. Number",
                "Collateral Number",
                "Collateral Type",
                "Collateral Amount",
                "Loan Amount",
                "Loan % Covered",
                "Amount Utilized",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      count: 7,
      number: "External Credit Bureau",
      content: (
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
              }}
            >
              <div>
                <HeaderComponent
                  title={"External Credit Bureau Details"}
                  backgroundColor={"orange"}
                  height={"35px"}
                  color={"white"}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <div style={{ borderBottom: "0.5px solid #828083" }}>
                  <h6>Enquiry made within the last 12 months</h6>
                </div>
              </div>
              <div>
                <InputField
                  label={"Number of enquiry made on behalf of this cutomer"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <InputField
                  label={
                    "Number of banks that have enquired about this customer"
                  }
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Printed Date"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Expiry Date"}
                  labelWidth={"70%"}
                />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <ButtonComponent
                    label={"Add Comments"}
                    buttonBackgroundColor={"black"}
                    buttonHeight={"40px"}
                    buttonWidth={"150px"}
                    buttonColor={"white"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"New"}
                    buttonBackgroundColor={"black"}
                    buttonHeight={"40px"}
                    buttonWidth={"100px"}
                    buttonColor={"white"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Save Credit Bureau"}
                    buttonBackgroundColor={"black"}
                    buttonHeight={"40px"}
                    buttonWidth={"200px"}
                    buttonColor={"white"}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
              }}
            >
              <div>
                <HeaderComponent
                  title={"Previous Credit Records"}
                  backgroundColor={"orange"}
                  height={"35px"}
                  color={"white"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility and paid on time"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility and didn't pay on time"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that is past due and still outstanding"
                  }
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that is still outstanding but performing"
                  }
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility that has been written off"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that has been negotiated for settlement"
                  }
                  labelWidth={"70%"}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            />
          </div>
          <br />
          <div>
            <HeaderComponent
              title={"Debts in the Name of Other Companies"}
              backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div>
            <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 p-2">
      <ul className="stepper rounded mb-4">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={`stepper__item cursor-pointer flex h-10 items-center justify-center ${
              index === activeStep
                ? "current text-white"
                : index < activeStep
                ? "complete"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="flex space-x-5 items-center justify-center">
              <div className="border-2 rounded-full w-7 h-7 flex justify-center items-center p-1 bg-black text-white">
                {step.count}
              </div>
              <div>{step.number}</div>
            </div>
          </li>
        ))}
      </ul>
      {steps[activeStep].content}
      <div className="flex justify-between mt-4">
        <button
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
            activeStep === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </button>
        <button
          className={`bg-orange-400 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded-r ${
            activeStep === steps.length - 1
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArrowStepper;
