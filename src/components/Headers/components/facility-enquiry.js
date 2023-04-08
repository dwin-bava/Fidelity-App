import React, { useEffect, useState } from "react";
import InputField from "../../../components/others/Fields/InputField";
import SelectField from "../../../components/others/Fields/SelectField";
import ListOfValue from "../../../components/others/Fields/ListOfValue";
import Modal from "react-bootstrap/Modal";
import DataTable from "../../../components/others/Datatable/DataTable";
import ButtonType from "../../../components/others/Button/ButtonType";
import Label from "../../others/Label/Label";
import { MDBIcon } from "mdb-react-ui-kit";
import { FiChevronRight, FiXCircle } from "react-icons/fi";
import LoanGeneralEnquiry from "./loan-general-enquiry";
import axios from "axios"
// import { clippingParents } from "@popperjs/core";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { API_SERVER } from './../../../config/constant';

function FacilityEnquiry() {
  // const [getTheme, setTheme] = useState(
  //   JSON.parse(localStorage.getItem("theme"))
  // );

  const [uniqueTuple, setUniqueTuple] = useState([])

  const [loanData, setLoanData] = useState([]);
  const [customerName, setCustomerName] = useState("")
  const [customerNames, setCustomerNames] =  useState([])
  // const [interestInSuspense, setInterestInSuspense] = useState("");
  // const [penalInSuspense, setPenalInSuspense] = useState("");
  // const [backDatedLoans, setBackDatedLoans] = useState("");
  // const [cancelled, setCancelled] = useState("");
  // const [restructured, setRestructured] = useState("");
  // const [inArrears, setInArrears] = useState("");
  // const [withPenalty, setWitPenalty] = useState("");
  // const [expired, setExpired] = useState("");
  // const [classified, setlassified] = useState("");
  // const [arrearsInterest, setArrearsInterest] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  // const [typeOfFacility, setTypeOfFacility] = useState("");
  // const [facilityAC, setFacilityAC] = useState("");
  // const [repaymentAC, setRepaymentAC] = useState("");
  // const [facilityStatus, setFacilityStatus] = useState("");
  // const [acClassification, setACClassification] = useState("");

  async function onOkPress() {
    console.log("clicked");
    await axios
      .post(API_SERVER + "/loan-general-enquiry", {
        name: customerName,
        customer_number: customerNumber
      })
      .then(function (response) {
        if(response.status === 200) {
          console.log(response.data);
          setLoanData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
      axios.get(API_SERVER + "/get-loan-general-enquiry").then(function(response){
          if(response.status === 200){
          console.log(response.data)
          setCustomerNames(response.data)
          }
      }).catch((err)=> {
        console.log(err)
      })
  }, [])

let arr = []
let arr2 = []

const bgColor = "#ffe1c4";



loanData.map((item , key)=>{
  return(
    arr.push([item["principal_account"],item["name"],null,item['tenor'],item['effective_date'],item['expiry_date'],item['interest_rate'],item['amount_granted'],item["total_balance"],item["accrued_int"],item["accrued_penalty"],item['class_code'],null,<div onClick={() => {handleShow();  setUniqueTuple({principal_account : loanData[key].principal_account , facility_no: loanData[key].facility_no}) }}><FiChevronRight color="green" size={23} /></div>])
  )
 })

 customerNames.map((item)=>{
  return(
    arr2.push(item["name"])
  )
 })

 console.log(arr2)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCustomerName = (event) => {setCustomerName(event)} 
  const handleCustomerNumber = (e) => {setCustomerNumber(e.target.value)} 
  

  const columns = [
    {
      name: "Facility A/C",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Customer Name",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Currency",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Tenor",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Effect. Date",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Expiry Date",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Rate",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Amt Granted",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Facility Bal",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },
    {
      name: "Accrued int",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },
    {
      name: "Accrued Pen.",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },
    {
      name: "Class",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },

    {
      name: "Facility Status",
      options: {
        seCellHeaderProps: () => ({
          style: {
           background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    },
    {
      name:"",
    }
  ];
  //Facility A/C


  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header style={{padding: 0}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "10px",
              backgroundColor: 'orange',
              color: 'white'
            }}
          >
            <div style={{ fontSize: "85%" }}>Loan General Enquiry</div>
            <div
              onClick={() => {
                handleClose();
              }}
              id="closeModalBTN"
            >
              <FiXCircle />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{zoom: 0.9}}>
          <LoanGeneralEnquiry state={uniqueTuple} />
        </Modal.Body>
      </Modal>
      

      <div style={{ display: "flex", flex: 1 }}>
        {/*///////////////////////////////////////////////////
          /////////////// FIRST SECTION ////////////
          ///////////////////////////////////////////////////*/}
        <div
          style={{
            flex: 0.4,
            marginRight: "10px",
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            boxShadow: " -15px 2px 16px 1px rgba(166,164,164,0.75)",
            borderTopLeftRadius: '5px',
            padding: "20px",
          }}
        >
          <ListOfValue
            marginBottom={"10px"}
            label={"Customer Name"}
            labelWidth={"25%"}
            inputWidth={"75%"}
            onChange={handleCustomerName}
            data={arr2}
            // key={arr}
        
          />

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                // marginBottom={"5px"}
                label={"Currency"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                // marginBottom={"5px"}
                label={"Branch"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"Effective Date"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"To"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"Disbursed Date"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"To"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"Expiry Date"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                type="date"
                // marginBottom={"10px"}
                label={"To"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Amt Granted Btw"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"and"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5, display: "flex" }}>
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: 0.5 }}>
                  <Label label={"Days to Expiry Btw"} fontSize={"85%"} />
                </div>
                <div style={{ display: "flex", flex: 0.5 }}>
                  <InputField inputWidth={"95%"} />
                  <div style={{ margin: "2px" }}>
                    <Label label={"and"} fontSize={"85%"} />
                  </div>
                  <InputField inputWidth={"95%"} />
                </div>
              </div>
            </div>

            <div style={{ flex: 0.5 }}>
              <ListOfValue
                // marginBottom={"10px"}
                label={"Sector"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          {/*Row*/}
          <div style={{ display: "flex", flex: 1, marginBottom: "10px" }}>
            <div style={{ flex: 0.5, display: "flex" }}>
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: 0.5 }}>
                  <Label label={"Days to Next"} fontSize={"85%"} />
                </div>
                <div style={{ display: "flex", flex: 0.5 }}>
                  <InputField inputWidth={"95%"} />
                  <div style={{ margin: "2px" }}>
                    <Label label={"and"} fontSize={"85%"} />
                  </div>
                  <InputField inputWidth={"95%"} />
                </div>
              </div>
            </div>

            <div style={{ flex: 0.5 }}>
              <ListOfValue
                // marginBottom={"10px"}
                label={"RO"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                
              />
            </div>
          </div>

          {/*Row */}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flex: 0.5 }}></div>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                // marginBottom={"10px"}
                label={"Product"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>
          </div>
        </div>

        {/*///////////////////////////////////////////////////
          /////////////// SECOND SECTION ////////////
          ///////////////////////////////////////////////////*/}
        <div
          style={{
            flex: 0.3,
            marginRight: "10px",
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            boxShadow: "20px -1px 26px 0px rgba(204,194,194,0.75)",
            borderTopRightRadius: '5px',
            padding: "20px",
          }}
        >
          <InputField
            marginBottom={"10px"}
            label={"Customer No"}
            labelWidth={"50%"}
            inputWidth={"50%"}
            onChange={handleCustomerNumber}
          />
          <SelectField
            marginBottom={"10px"}
            label={"Type of Facility"}
            labelWidth={"50%"}
            inputWidth={"50%"}
          />
          <InputField
            marginBottom={"10px"}
            label={"Facility A/C"}
            labelWidth={"50%"}
            inputWidth={"50%"}
          />
          <InputField
            marginBottom={"10px"}
            label={"Repayment A/C"}
            labelWidth={"50%"}
            inputWidth={"50%"}
          />
          <SelectField
            marginBottom={"10px"}
            label={"Facility Status"}
            labelWidth={"50%"}
            inputWidth={"50%"}
          />
          <SelectField
            marginBottom={"10px"}
            label={"A/C Classification"}
            labelWidth={"50%"}
            inputWidth={"50%"}
          />

          <InputField marginBottom={"10px"} disabled inputWidth={"100%"} />
          <InputField marginBottom={"10px"} disabled inputWidth={"100%"} />
          <InputField marginBottom={"10px"} disabled inputWidth={"100%"} />
        </div>

        {/*///////////////////////////////////////////////////
          /////////////// THIRD SECTION ////////////
          ///////////////////////////////////////////////////*/}
        <div
          style={{
            flex: 0.3,
            marginRight: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "20px",
          }}
        >
          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Interest In Suspense"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"Yes"}
                  type="radio"
                  name="Interest In Suspense"
                />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"No"}
                  type="radio"
                  name="Interest In Suspense"
                />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"All"}
                  type="radio"
                  name="Interest In Suspense"
                />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Penal In Suspense"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"Yes"}
                  type="radio"
                  name="Penal In Suspense"
                />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"No"}
                  type="radio"
                  name="Penal In Suspense"
                />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"All"}
                  type="radio"
                  name="Penal In Suspense"
                />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Backdated Loans"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="Backdated Loans" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Backdated Loans" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="Backdated Loans" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Cancelled"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="Cancelled" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Cancelled" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="Cancelled" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Restructured"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="Restructured" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Restructured" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="Restructured" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"In Arrears"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="In Arrears" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="In Arrears" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="In Arrears" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"With Penalty"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="With Penalty" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="With Penalty" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="With Penalty" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Expired"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="Expired" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Expired" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="Expired" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Classified"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"Yes"} type="radio" name="Classified" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Classified" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"All"} type="radio" name="Classified" />
              </div>
            </div>
          </div>

          {/*radio buttons section*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <Label label={"Arrears Interest"} />
            </div>

            <div style={{ width: "50%", display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"Yes"}
                  type="radio"
                  name="Arrears Interest"
                />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType label={"No"} type="radio" name="Arrears Interest" />
              </div>

              <div style={{ marginRight: "10px" }}>
                <ButtonType
                  label={"All"}
                  type="radio"
                  name="Arrears Interest"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* <div>
        <DataTableAnnex />
      </div> */}

<div className="w-full ">
        <div
          style={{ marginTop: "-15px", textAlign: "right", zoom: "0.85" }}
          centered
        >
          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-secondary"
              style={{
                backgroundColor: 'black'
              }}
              onClick={() => onOkPress()}
            >
              <MDBIcon
                style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                fas
                icon="check"
              />
              <br />
              Fetch
            </button>
          </span>
          

          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button className="btn btn-secondary" onClick={()=>{
              setCustomerName('');
              setCustomerNumber('')
            }}  style={{
              backgroundColor: 'black',
              color:'white'
              }}>
              <MDBIcon
                style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                fas
                icon="sync"
              />
              {/* <BsFillCheckCircleFill color={"white"} /> */}
              <br />
              Refresh
            </button>
          </span>


          <span style={{ paddingLeft: 5, paddingRight: 5 }}>
            <button
              className="btn btn-secondary"
              style={{
                backgroundColor: 'black'
              }}
              onClick={() => handleClose()}
            >
              <MDBIcon
                style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                fas
                icon="sign-out-alt"
              />
              <br />
              Exit
            </button>
          </span>

        </div>
      </div>
      <hr />

      <div>
        <DataTable columns={columns} data={arr} rowsPerPage={3} />
      </div>
    </div>
  );
}

export default FacilityEnquiry;
