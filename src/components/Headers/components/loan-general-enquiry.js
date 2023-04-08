import React, { useState, useEffect } from "react";
import InputField from "../../others/Fields/InputField";
import ButtonComponent from "../../others/Button/ButtonComponent";
import ListOfValue from "../../others/Fields/ListOfValue";
import { MDBIcon } from "mdb-react-ui-kit";
import DataTable from "../../../components/others/Datatable/DataTable";
import axios from 'axios'
import { API_SERVER } from './../../../config/constant';

function LoanGeneralEnquiry({state}) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const bgColor = "#ffe1c4";

  const [allTheData, setAllTheData] = useState([])
  const [allTheData2, setAllTheData2] = useState([])

  useEffect(()=>{
    axios.post(API_SERVER + '/loan-general-enquiry',{
      facility_account: state.principal_account,
    }).then(function(response){
      console.log(response.data, "first data")
      setAllTheData(response.data)
    }).catch((err)=>{
      console.log(err)
    })



    axios.post(API_SERVER + '/loan-general-enquiry',{
      facility_no: state.facility_no,
    }).then(function(res){
      console.log(res.data, "second data")
      setAllTheData2(res.data)
    }).catch((err)=>{
      console.log(err)
    })

  }, [])

  
let arr = []
let arr2 = []

allTheData.map((item , key)=>{
  return(
    arr.push([item["facility_no"],item['principal_account'],item["maintenance_fee_account"],item['disbursement_date'],item['last_repay_date'],null,null,null,item['facility_amount'],item['interest_rate'],item["loan_status"] ])
  )
 })

 allTheData2.map((item , key)=>{
  return(
    arr2.push([item["serial_no"],item['date_due'],item["principal"],item['interest'],item['monthp'],item['prp'],item['int_paid'],item['ppd'],item['intpaide_date'] ])
  )
 })




  console.log(state)
  console.log(allTheData)
  console.log(allTheData2)

  const [customerNumber, setCustomerNumber] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [classification, setClassification] = useState("");
  const [sector, setSector] = useState("");
  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");
  const [totalFacilityBalance, setTotalFacilityBalance] = useState("");

  const columns = [
    {
      name: "Facility No",
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
      name: "Repayment A/C",
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
      name: "Disb. Date",
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
      name: "Loan Officer",
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
      name: "Int Rate",
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
      name: "Status",
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
  ];

// second section of the columns // 
  const columns2 = [
    {
      name: "Seq No",
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
      name: "Due Date",
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
      name: "Principal",
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
      name: "Interest",
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
      name: "Total Installment",
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
      name: "Principal Paid",
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
      name: "Interest Paid",
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
      name: "Pri. Repay Date",
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
      name: "Int. Repay Date",
      options: {
        seCellHeaderProps: () => ({
          style: {
            background: bgColor, color: "black",
            padding: "0px",
            margin: "0px",
          },
        }),
      },
    }
  ];

  return (
    <div>
      
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            flex: 0.5,
            marginRight: "5px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "10px",
          }}
        >
          <div>
            {console.log(allTheData[0]?.acct_name, "account name")}
            <InputField inputWidth={"100%"} disabled marginBottom={"10px"} value={allTheData[0]?.acct_name} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <InputField
              label={"Customer No"}
              labelWidth={"56%"}
              inputWidth={"60%"}
              disabled
              value={allTheData[0]?.customer_no}
              type={'number'}
                paddingRight={'7px'}
            />
            <InputField
              label={"Prod Desc."}
              labelWidth={"40%"}
              inputWidth={"60%"}
              disabled
            />
          </div>

          <InputField
            label={"Address"}
            labelWidth="25%"
            inputWidth={"75%"}
            disabled
            marginBottom={"10px"}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Email"}
                labelWidth={"50%"}
                inputWidth={"50%"}
              />
            </div>

            <div style={{ flex: 0.5, textAlign: "center" }}>
              <div style={{ marginLeft: "50%" }}>
                <ButtonComponent
                  buttonWidth={"120px"}
                  buttonHeight={"25px"}
                  label={"Send Email"}
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Phone"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>

            <div style={{ flex: 0.5, textAlign: "center" }}>
              <div style={{ marginLeft: "50%" }}>
                <ButtonComponent
                  buttonWidth={"120px"}
                  buttonHeight={"25px"}
                  label={"Send SMS"}
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: 0.5, marginRight: "3px" }}>
              <InputField
                label={"Classification"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.ac_class}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Sector"}
                textAlign={"center"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.sector}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <ButtonComponent
                buttonHeight={"25px"}
                label={"View All Loans"}
                buttonWidth={"135px"}
              />
            </div>
          </div>
        </div>

        {/*Other Section*/}
        <div
          style={{
            flex: 0.5,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "10px",
          }}
        >
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <InputField
                label={"Principal Balance"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.loan_bal}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>
          </div>

          <div style={{fontSize: '15px', fontStyle: 'bold'}}>Arrears</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              
            }}
          >
            <div style={{ flex: 0.5, marginRight: "3px" }}>
              <InputField
                label={"Principal"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.prin_pastdue}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Interest"}
                textAlign="center"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.accr_int}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>
          </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{ fontSize: '15px', fontStyle:'bold'}}>Accrual</div>
<hr />
            </div>
          
          <div style={{display:"flex", alignItems: 'center'}}>
            <div style={{flex:0.5, textAlign: 'right', marginBottom: '3px', width: '100%'}}>Income</div>
            <div style={{flex:0.5, textAlign: 'right', marginBottom: '3px', width: '100%'}}>Suspense</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: 0.5, marginRight: "3px" }}>
              <InputField
                label={"Interest"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.accr_int}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                textAlign="center"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.int_susp}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: 0.5, marginRight: "3px" }}>
              <InputField
                label={"Penal"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.arrears_int}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>

            <div style={{ flex: 0.5 }}>
              <InputField
                textAlign="center"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={allTheData[0]?.penal_susp}
                type={'number'}
                paddingRight={'7px'}
              />
            </div>
          </div>

          <hr />

          <InputField
            label={"Total Facility Balance"}
            labelWidth={"25%"}
            inputWidth={"75%"}
            disabled
            value={allTheData[0]?.total_amt}
            type={'number'}
                paddingRight={'7px'}
          />
        </div>
      </div>
      <br />

      <div>
        <DataTable columns={columns} data={arr} />
      </div>
      <br />


      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ButtonComponent buttonHeight={"30px"} label={"Print Loan Schedule"} />
        <ButtonComponent buttonHeight={"30px"} label="Print Repayments" />
        <ButtonComponent buttonHeight={"30px"} label={"Loan Rescheduling"} />
        <ButtonComponent
          buttonHeight={"30px"}
          label={"Charges statements enq."}
        />
        <ButtonComponent
          buttonHeight={"30px"}
          label={"Print Statements (Hist)"}
        />
      </div>
      <br/>

      <div>
      <div>
        <DataTable columns={columns2} data={arr2} rowsPerPage={2} />
      </div>
      </div>


      
    </div>
  );
}

export default LoanGeneralEnquiry;
