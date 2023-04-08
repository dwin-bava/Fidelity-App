require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const multer = require("multer");
// oracledb.initOracleClient({ libDir: "C:/instantclient_21_9" });

const port = 3020;
const app = express();

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

const util = require("util");
require("dotenv").config();

var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var IPSTACK_API_KEY = process.env.IPSTACK_API_KEY_ORACLE;

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

const fetch = require("cross-fetch");

const os = require("os");

function formatAmount(number) {
  // Convert number to a string and add commas for thousands separator
  let formattedNumber = number.toLocaleString();

  // Add a currency symbol and return the formatted number
  return formattedNumber;
}

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias;
      }
    }
  }
  return null;
}

const MenuIcon = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null,  "../public/assets/menu-icons");
    cb(null, "../client/public/assets/menu-icons");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.menu_name.replace(/\s+/g, "-").toLowerCase() + ".png");
  },
});

const uploadMenuIcon = multer({ storage: MenuIcon });

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// ORACLE API ENDPOINTS       ////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Test SQL Connection
app.get("/test-oracle", (req, res) => {
  let testConnectionAPI = require("./controllers/oracle");

  testConnectionAPI.then(function (result) {
    res.send([{ responseCode: "000", responseMessage: result }]);
    // res.send(result);
  });
});

// Login API Endpoint - ORACLE
app.post("/login", (req, res) => {
  let loginAPI = require("./controllers/auth/login");

  let username = req.body.username;
  let password = req.body.password;

  loginAPI.loginFunc(username, password).then((result) => {
    // console.log(result);
    if (result) {
      // If user is logged in successfully
      if (
        result.outBinds?.login_code === 000 ||
        result.outBinds?.login_code === "000"
      ) {
        const id = result.outBinds.USERID;
        const username = result.outBinds.FNAME;
        const email = result.outBinds.EMAIL;
        const login_code = result.outBinds.login_code;
        // const user_group = result.rows[i][1];
        // const user_type = result.rows[i][69];
        const lang = result.outBinds.LANG;
        const postingDate = result.outBinds.PD;
        const branch = result.outBinds.BR_DESC;
        const mess1 = result.outBinds?.mess;
        const branchCode = result.outBinds.BRACODE;

        response = {
          success: true,
          user: {
            id: id,
            username: username,
            email: email,
            responseCode: login_code,
            responseMessage: mess1,
            postingDate: postingDate,
            branch: branch,
            // user_group: user_group,
            // user_type: user_type,
            lang: lang,
            branchCode: branchCode,
          },
          token: null,
        };

        res.send(response);

        // return response;
      } else {
        // var mess = result.outBinds.mess;

        response = {
          success: false,
          responseMessage: result.outBinds,
        };
      }
    }
  });
});


// Get Loan Schedule Enquiry API Endpoint - ORACLE
app.post("/loan-schedule-enquiry", (req, res) => {
  let facility_number = req.body.facility_number;

  let getLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM SCHEDULE_ENQ_VW WHERE facility_no = '${facility_number}'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send({
          responseCode: "000",
          responseMessage: response,
        });
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getLoanEnquiry();
});

// Loan Shedule Quotation API Endpoint - ORACLE
app.post("/loan-schedule-quotation", (req, res) => {
  let loanScheduleQuotationAPI = require("./controllers/loan/loan-schedule-quotation");

  let facility_number = req.body.facility_number;
  let interest_rate = req.body.interest_rate;
  let facility_amount = req.body.facility_amount;
  let principal_moratorium = req.body.principal_moratorium;
  let interest_moratorium = req.body.interest_moratorium;
  let loan_tenor_in_months = req.body.loan_tenor_in_months;
  let effective_date = req.body.effective_date;
  let interest_type = req.body.interest_type;
  let principal_repayment_frequency = req.body.principal_repayment_frequency;
  let principal_repayment_count = req.body.principal_repayment_count;
  let schedule_start_date = req.body.schedule_start_date;
  let processing_fees = req.body.processing_fees;
  let last_working_day_of_the_month = req.body.last_working_day_of_the_month;
  let interest_repayment_frequency = req.body.interest_repayment_frequency;
  let interest_repayment_count = req.body.interest_repayment_count;
  let ballon_installment_to_be_applied =
    req.body.ballon_installment_to_be_applied;
  let ballon_on_installment_number = req.body.ballon_on_installment_number;
  let first_principal_repay_date = req.body.first_principal_repay_date;
  let last_repayment_date = req.body.last_repayment_date;
  let legal_form = req.body.legal_form;
  let currency = req.body.currency;
  let exempt_month = req.body.exempt_month;
  let net_monthly_salary = req.body.net_monthly_salary;

  loanScheduleQuotationAPI
    .loanScheduleQuotationFunc(
      facility_number,
      interest_rate,
      facility_amount,
      principal_moratorium,
      interest_moratorium,
      loan_tenor_in_months,
      effective_date,
      interest_type,
      principal_repayment_frequency,
      principal_repayment_count,
      schedule_start_date,
      processing_fees,
      last_working_day_of_the_month,
      interest_repayment_frequency,
      interest_repayment_count,
      ballon_installment_to_be_applied,
      ballon_on_installment_number,
      first_principal_repay_date,
      last_repayment_date,
      legal_form,
      currency,
      exempt_month,
      net_monthly_salary
    )
    .then((result) => {
      // console.log(result);
      if (result) {
        res.send(result);
      }
    });
});




// Get Loan General Enquiry API Endpoint - ORACLE
app.get("/loan-general-enquiry", (req, res) => {
  const name = req.body.name;
  const customer_number = req.body.customer_number;
  const repayment_account = req.body.repayment_account;
  const amount_granted = req.body.amount_granted;
  const intsus_flag = req.body.intsus_flag;
  const pensus_flag = req.body.pensus_flag;
  const penal_flag = req.body.penal_flag;
  const canc_flag = req.body.canc_flag;

  let getGeneralLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      let determinant = "";

      if (name) {
        determinant = ` NAME LIKE '%${name}%'`;
      }

      if (customer_number) {
        if (deterninant) {
          determinant = ` AND CUSTOMER_NUMBER = '${customer_number}'`;
        } else {
          determinant = ` CUSTOMER_NUMBER = '${customer_number}'`;
        }
      }

      if (repayment_account) {
        if (determinant) {
          determinant = ` AND REPAYMENT_ACCOUNT = '${repayment_account}'`;
        } else {
          determinant = ` REPAYMENT_ACCOUNT = '${repayment_account}'`;
        }
      }

      if (amount_granted) {
        if (determinant) {
          determinant = ` AND AMOUNT_GRANTED = '${amount_granted}'`;
        } else {
          determinant = ` AMOUNT_GRANTED = '${amount_granted}'`;
        }
      }

      if (intsus_flag) {
        if (determinant) {
          determinant = ` AND INTSUS_FLAG = '${intsus_flag}'`;
        } else {
          determinant = ` INTSUS_FLAG = '${intsus_flag}'`;
        }
      }

      if (pensus_flag) {
        if (determinant) {
          determinant = ` AND PENSUS_FLAG = '${pensus_flag}'`;
        } else {
          determinant = ` PENSUS_FLAG = '${pensus_flag}'`;
        }
      }

      if (penal_flag) {
        if (determinant) {
          determinant = ` AND PENAL_FLAG = '${penal_flag}'`;
        } else {
          determinant = ` PENAL_FLAG = '${penal_flag}'`;
        }
      }

      if (canc_flag) {
        if (determinant) {
          determinant = ` AND CANC_FLAG = '${canc_flag}'`;
        } else {
          determinant = ` CANC_FLAG = '${canc_flag}'`;
        }
      }

      if (restr_flag) {
        if (determinant) {
          determinant = ` AND RESTR_FLAG = '${restr_flag}'`;
        } else {
          determinant = ` RESTR_FLAG = '${restr_flag}'`;
        }
      }

      if (bkdated_flag) {
        if (determinant) {
          determinant = ` AND BKDATED_FLAG = '${bkdated_flag}'`;
        } else {
          determinant = ` BKDATED_FLAG = '${bkdated_flag}'`;
        }
      }

      if (arrint_flag) {
        if (determinant) {
          determinant = ` AND ARRINT_FLAG = '${arrint_flag}'`;
        } else {
          determinant = ` ARRINT_FLAG = '${arrint_flag}'`;
        }
      }

      if (expired_flag) {
        if (determinant) {
          determinant = ` AND EXPIRED_FLAG = '${expired_flag}'`;
        } else {
          determinant = ` EXPIRED_FLAG = '${expired_flag}'`;
        }
      }

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM VW_LOAN_GEN_ENQnew WHERE ${determinant}`
      );

      // return res.send(data);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
        // console.log(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getGeneralLoanEnquiry();
});



// Get Loan Product API Endpoint - ORACLE
app.get("/get-loan-products", (req, res) => {
  let getLoanProduct = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT description as label, PROD_SGROUP value FROM tb_product a WHERE PROD_GROUP ='5' and exists (SELECT 1 FROM FACILITY_CONTROLSS x where a.PROD_SGROUP = x.legal_form) order by PROD_SGROUP`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getLoanProduct();
});

// Get Currency API Endpoint - ORACLE
app.get("/get-currency", (req, res) => {
  let getCurrency = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `select currency_code as value,iso_code || ' - ' || description as  label from tb_currency where allow_loan='Y'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getCurrency();
});

// Get Interest Type API Endpoint - ORACLE
app.get("/get-interest-type", (req, res) => {
  let getInterestType = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT ACTUAL_CODE || ' - ' || DESCRIPTION   as label, ACTUAL_CODE as value FROM CODE_DESC WHERE CODE_TYPE='LRT' AND NVL(STATUS, 'Y') ='Y'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getInterestType();
});

// Get Principal Repayment Frequency API Endpoint - ORACLE
app.get("/get-principal-repayment-frequency", (req, res) => {
  let getInterestType = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT ACTUAL_CODE || ' - ' || DESCRIPTION as label, ACTUAL_CODE as value FROM CODE_DESC WHERE CODE_TYPE='LRP' AND NVL(STATUS, 'Y') ='Y'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getInterestType();
});

// Get Interest Repayment Frequency API Endpoint - ORACLE
app.get("/get-interest-repayment-frequency", (req, res) => {
  let getInterestType = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT ACTUAL_CODE || ' - ' || DESCRIPTION as label, ACTUAL_CODE as value FROM CODE_DESC WHERE CODE_TYPE='LRP' AND NVL(STATUS, 'Y') ='Y'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getInterestType();
});

// Get Loan Schedule API Endpoint - ORACLE
app.post("/get-loan-schedule", (req, res) => {
  let facility_number = req.body.facility_number;

  let getLoanSchedule = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM R_SCHEDULE_TEMP WHERE facility_no = '${facility_number}'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send({
          responseCode: "000",
          responseMessage: response,
        });
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getLoanSchedule();
});

// Get Loan Repayment Schedule API Endpoint - ORACLE
app.post("/get-loan-repayment-schedule", (req, res) => {
  let facility_number = req.body.facility_number;

  let getLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM REPAYMENT_SCHD_HDNEW WHERE facility_no = '${facility_number}'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send({
          responseCode: "000",
          responseMessage: response,
        });
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getLoanEnquiry();
});

app.get("/get-ip", (req, res) => {
  async function getIp() {
    const response = await getIPAddress();
    res.send(response);
  }
});

// Get Loan General Enquiry API Endpoint - ORACLE
app.get("/loan-general-enquiry", (req, res) => {
  let getGeneralLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(`SELECT * FROM VW_LOAN_GEN_ENQnew`);

      // return res.send(data);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getGeneralLoanEnquiry();
});

// Get Batch Number API Endpoint - ORACLE
app.get("/get-unique-ref", (req, res) => {
  let getBatchNumberAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(`SELECT Get_batchno as unique_ref FROM dual`);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getBatchNumberAPI();
});

// Get Extra Loan Info API Endpoint - ORACLE
app.post("/get-extra-loan-info", (req, res) => {
  let net_monthly_salary = req.body.net_monthly_salary;
  let facility_number = req.body.facility_number;

  let getMenusAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const result = [];
      const dsrResponse = [];
      const firstNLastPrincipalRepayDateResponse = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const dsr = await execute(
        `SELECT round(NVL( AVG(ACTUAL),1)/ NVL(${net_monthly_salary},1)*100,2) as DSR FROM VW_REP_LOAN_SCHEDULE_ENQ WHERE FACILITY_NO = '${facility_number}'`
      );

      const first_and_last_principal_repay_date = await execute(
        `select to_char(first_principal_repay_date,'DD-MON-YYYY') as first_principal_repay_date, to_char(last_repay_date,'DD-MON-YYYY') as last_repay_date from facilitye where FACILITY_NO = '${facility_number}'`
      );

      for (let i = 0; i < dsr.rows.length; i++) {
        for (let x = 0; x < dsr.metaData.length; x++) {
          arr0 +=
            '"' +
            [dsr.metaData[x].name.toLowerCase()] +
            '" : "' +
            dsr.rows[i][x] +
            '",';
        }

        dsrResponse.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
      }

      for (
        let i = 0;
        i < first_and_last_principal_repay_date.rows.length;
        i++
      ) {
        for (
          let x = 0;
          x < first_and_last_principal_repay_date.metaData.length;
          x++
        ) {
          arr0 +=
            '"' +
            [
              first_and_last_principal_repay_date.metaData[
                x
              ].name.toLowerCase(),
            ] +
            '" : "' +
            first_and_last_principal_repay_date.rows[i][x] +
            '",';
        }

        firstNLastPrincipalRepayDateResponse.push(
          JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}")
        );
      }

      res.send({
        responseCode: "000",
        responseMessage: firstNLastPrincipalRepayDateResponse,
      });
    } finally {
      // conn.end();
    }
  };

  getMenusAPI();
});

// Get Menu's API Endpoint - ORACLE
app.get("/get-menus", (req, res) => {
  let getMenusAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM TB_MENUS WHERE menu_permitted = 'Y' AND bank_permission = 'Y' ORDER BY menu_groupings ASC`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getMenusAPI();
});

// Get Menu's API Endpoint - ORACLE
app.get("/get-menu-urls", (req, res) => {
  let getMenuURLsAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM tb_menus WHERE menu_level IN ('1' , '2') AND type_code  IN  ('collapse-custom', 'item')  ORDER BY menu_groupings ASC`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getMenuURLsAPI();
});

// Get Menu Icons API Endpoint - ORACLE
app.get("/get-menu-icons", (req, res) => {
  let getMenuIconsAPI = async () => {
    let arr0 = "";
    let response = [];

    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM tb_menus WHERE menu_permitted = 'Y' AND bank_permission = 'Y' ORDER BY menu_groupings ASC`
      );
      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        const arr1 = [];
        response.map((i) => {
          if (i.menu_level !== 0) {
            arr1.push({
              id: i.menu_id,
              title: i.menu_name,
              type: i.type_code,
              url: i.menu_url,
              icon: i.icon,
              color: i.color,
              parent_menu_id: i.parent_menu_id,
              menu_level: i.menu_level,
            });
          }
        });

        arr1.map((i) => {
          i.children = [];
          arr1.map((a) => {
            if (a.parent_menu_id === i.id) {
              i.children.push(a);
            }
          });
        });

        const arr = [];
        arr1.map((i) => {
          if (i.menu_level === "1") {
            arr.push(i);
          }
        });
        const menuID = JSON.stringify(arr, getCircularReplacer());
        res.send(JSON.parse(menuID));
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } catch (error) {
      // finally{
      // }

      // db.end();
      console.log(error);
    }
  };

  getMenuIconsAPI();
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
});

app.get("/get-test-api", (req, res) => {
  res.send([
    { responseCode: "000", responseMessage: "My new api stuff here..." },
  ]);
});

// Get Menus By Menu Level's API Endpoint - ORACLE
app.post("/get-active-menus-by-menu-level", (req, res) => {
  let menu_level = req.body.menu_level;

  let getMenusByLevelFunc = async (menu_level) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT * FROM TB_MENUS WHERE bank_permission = 'Y' AND menu_permitted = 'Y' AND menu_level =
          '${menu_level}'
          ORDER BY menu_groupings ASC`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getMenusByLevelFunc(menu_level);
});

// Get Menus By Menu Level's API Endpoint - ORACLE
app.post("/get-menus-by-menu-level", (req, res) => {
  let menu_level = req.body.menu_level;

  let getMenusByLevelFunc = async (menu_level) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT * FROM TB_MENUS WHERE menu_level =
          '${menu_level}'
          ORDER BY menu_groupings ASC`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getMenusByLevelFunc(menu_level);
});

// Update Menu Detail's API Endpoint - ORACLE
app.post("/update-menu-details", uploadMenuIcon.single("fileX"), (req, res) => {
  let id = req.body.id;
  let menu_id = req.body.menu_id;
  let menu_level = req.body.menu_level;
  let menu_name = req.body.menu_name;
  let parent_menu_id = req.body.parent_menu_id;
  let menu_groupings = req.body.menu_groupings;
  let icon = req.body.icon;
  let color = req.body.color;
  let type_code = req.body.type_code;
  let file_name = req.body.file_name;
  let menu_url = req.body.menu_url;
  let menu_permitted = req.body.menu_permitted;
  let bank_permission = req.body.bank_permission;

  let updateMenuDetailsFunc = async (
    id,
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  ) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      let response = await execute(
        `UPDATE TB_MENUS SET 
        menu_id = '${menu_id}', 
        menu_level = '${menu_level}', 
        menu_name = '${menu_name}', 
        parent_menu_id = '${parent_menu_id}', 
        menu_groupings = '${menu_groupings}', 
        icon = '${icon}', 
        color ='${color}',
        type_code = '${type_code}',
        file_name ='${file_name}',
        menu_url = '${menu_url}',
        menu_permitted = '${menu_permitted}',
        bank_permission = '${bank_permission}' WHERE id='${id}'`
      );

      if (response) {
        res.send([
          {
            responseCode: "000",
            responseMessage:
              "The Details of the Menu Icon Has Been Updated Successfully",
          },
        ]);
      }
    } finally {
      // conn.end();
    }
  };

  return updateMenuDetailsFunc(
    id,
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  );
});

// Add Menu's API Endpoint - ORACLE
app.post("/add-menu", (req, res) => {
  let addMenuAPI = require("./controllers/menus/add-menu");

  let menu_id = req.body.menu_id;
  let menu_level = req.body.menu_level;
  let menu_name = req.body.menu_name;
  let parent_menu_id = req.body.parent_menu_id;
  let menu_groupings = req.body.menu_groupings;
  let icon = req.body.icon;
  let color = req.body.color;
  let type_code = req.body.type_code;
  let file_name = req.body.file_name;
  let menu_url = req.body.menu_url;
  let menu_permitted = req.body.menu_permitted;
  let bank_permission = req.body.bank_permission;

  let addMenuFunc = async (
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  ) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      let response = await execute(
        `INSERT INTO TB_MENUS(id, menu_id, menu_level, menu_name, parent_menu_id, menu_groupings, icon, color, type_code, file_name, menu_url, menu_permitted, bank_permission) VALUES (
         '${new Date().getTime()}',
         '${menu_id}', 
         '${menu_level}', 
         '${menu_name}', 
         '${parent_menu_id}', 
         '${menu_groupings}', 
         '${icon}', 
         '${color}',
         '${type_code}',
         '${file_name}',
         '${menu_url}',
         '${menu_permitted}',
         '${bank_permission}')`
      );

      if (response) {
        res.send([
          {
            responseCode: "000",
            responseMessage: "Menu Has Been Added Successfully",
          },
        ]);
      }
    } finally {
      // conn.end();
    }
  };

  return addMenuFunc(
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  );
});

app.post("/find-by-name", (req, res) => {
  const accountName = req.body.accountName;
  // return res.send(accountName);
  async function getCodeDetails() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT A.account_descrp, A.acct_link, B.ISO_CODE, A.customer_number, A.status_indicator FROM g_ledger A, TB_CURRENCY B WHERE A.account_descrp LIKE '%${accountName}%' AND type_of_acct IN ('1','2','9') AND A.CURRENCY_CODE = B.CURRENCY_CODE AND ROWNUM <= 50 ORDER BY A.account_descrp`
      );

      // return res.send(data);
      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][0];
          const actual_code = data.rows[i][1];
          const short_descrp = data.rows[i][2];

          arr.push({
            accountName: description,
            accountNumber: actual_code,
            isoCode: short_descrp,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        // console.log(err);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  getCodeDetails();
});

// Add Sub Menu's API Endpoint - ORACLE
app.post("/add-sub-menu", (req, res) => {
  let addSubMenuAPI = require("./controllers/menus/add-sub-menu");

  let menu_id = req.body.menu_id;
  let menu_level = req.body.menu_level;
  let menu_name = req.body.menu_name;
  let parent_menu_id = req.body.parent_menu_id;
  let menu_groupings = req.body.menu_groupings;
  let icon = req.body.icon;
  let color = req.body.color;
  let type_code = req.body.type_code;
  let file_name = req.body.file_name;
  let menu_url = req.body.menu_url;
  let menu_permitted = req.body.menu_permitted;
  let bank_permission = req.body.bank_permission;

  let addSubMenuFunc = async (
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  ) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      let response = await execute(
        `p'[INSERT INTO TB_MENUS(id, menu_id, menu_level, menu_name, parent_menu_id, menu_groupings, icon, color, type_code, file_name, menu_url, menu_permitted, bank_permission) VALUES (
         '${new Date().getTime()}',
         '${menu_id}', 
         '${menu_level}', 
         '${menu_name}', 
         '${parent_menu_id}',
         '${menu_groupings}', 
         '${icon}', 
         '${color}',
         '${type_code}',
         '${file_name}',
         '${menu_url}',
         '${menu_permitted}',
         '${bank_permission}')]'`
      );

      if (response) {
        res.send([
          {
            responseCode: "000",
            responseMessage: "Sub Menu Has Been Added Successfully",
          },
        ]);
      }
    } finally {
      // conn.end();
    }
  };

  return (addSubMenuFunc = async(
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  ));
});

// Add Menu Icon's API Endpoint - ORACLE
app.post("/add-menu-icon", uploadMenuIcon.single("file"), (req, res) => {
  let addMenuIconAPI = require("./controllers/menus/add-menu-icon");

  let menu_id = req.body.menu_id;
  let menu_level = req.body.menu_level;
  let menu_name = req.body.menu_name;
  let parent_menu_id = req.body.parent_menu_id;
  let menu_groupings = req.body.menu_groupings;
  let icon = req.body.icon;
  let color = req.body.color;
  let type_code = req.body.type_code;
  let file_name = req.body.file_name;
  let menu_url = req.body.menu_url;
  let menu_permitted = req.body.menu_permitted;
  let bank_permission = req.body.bank_permission;

  let addMenuIconFunc = async (
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  ) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      let response = await execute(
        `INSERT INTO TB_MENUS(id, menu_id, menu_level, menu_name, parent_menu_id, menu_groupings, icon, color, type_code, file_name, menu_url, menu_permitted, bank_permission) VALUES (
               '${new Date().getTime()}',
               '${menu_id}', 
               '${menu_level}', 
               '${menu_name}', 
               '${parent_menu_id}', 
               '${menu_groupings}', 
               '${icon}', 
               '${color}',
               '${type_code}',
               '${file_name}',
               '${menu_url}',
               '${menu_permitted}',
               '${bank_permission}')`
      );

      if (response) {
        res.send([
          {
            responseCode: "000",
            responseMessage: "Menu Icon Has Been Added Successfully",
          },
        ]);
      }
    } finally {
      // conn.end();
    }
  };

  return addMenuIconFunc(
    menu_id,
    menu_level,
    menu_name,
    parent_menu_id,
    menu_groupings,
    icon,
    color,
    type_code,
    file_name,
    menu_url,
    menu_permitted,
    bank_permission
  );
});

// Get Sub Menus By Parent Menu ID's API Endpoint - ORACLE
app.post("/get-sub-menus-by-parent-menu-id", (req, res) => {
  let parent_menu_id = req.body.parent_menu_id;

  let getSubMenusByParentMenuIDFunc = async (parent_menu_id) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT * FROM TB_MENUS WHERE parent_menu_id =
          '${parent_menu_id}'
          ORDER BY menu_groupings ASC`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getSubMenusByParentMenuIDFunc(parent_menu_id);
});

// Get English Locales API Endpoint - ORACLE
app.get("/get-english-locales", (req, res) => {
  let getEnglishLocalesAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      // const result = await execute(
      //   `SELECT lb.lable as lable, lng.text as lang_en FROM tb_languages as lng JOIN tb_labels as lb ON lb.id = lng.lable_id WHERE lng.language = "en" AND (lb.status = 1 AND lng.status = 1)`
      // );

      const result1 = await execute(`SELECT * FROM tb_languages`);
      const result2 = await execute(`SELECT * FROM tb_labels`);

      if (result1 && result2) {
        const result = [];
        result1.rows.map((i) => {
          result2.rows.map((a) => {
            if (i[2] === "en" && a[2] === 1 && i[4] === 1) {
              result.push({ label: a[1], lang_en: i[3] });
            }
          });
        });
        // return result;

        for (let i = 0; i < result.length; i++) {
          const label = result[i].label;
          const lang_en = result[i].lang_en;

          response.push({
            [label]: lang_en,
          });
        }

        return response;
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    } finally {
      // conn.end();
    }
  };

  return getEnglishLocalesAPI();
});

// Get French Locales API Endpoint - ORACLE
app.get("/get-french-locales", (req, res) => {
  let getFrenchLocalesAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      // const result = await execute(
      //   'SELECT lb.lable as lable, lng.text as lang_fr FROM tb_languages as lng JOIN tb_lables as lb ON lb.id = lng.lable_id WHERE lng.language = "fr" AND (lb.status = 1 AND lng.status = 1)'
      // );

      const result1 = await execute(`SELECT * FROM tb_languages`);
      const result2 = await execute(`SELECT * FROM tb_labels`);

      if (result1 && result2) {
        // return result1;
        const result = [];
        result1.rows.map((i) => {
          result2.rows.map((a) => {
            if (i[2] === "fr" && a[2] === 1 && i[4] === 1) {
              result.push({ label: a[1], lang_fr: i[3] });
            }
          });
        });

        for (let i = 0; i < result.length; i++) {
          const label = result[i].label;
          const lang_fr = result[i].lang_fr;

          response.push({
            [label]: lang_fr,
          });
        }

        return response;
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    } finally {
      // conn.end();
    }
  };

  return getFrenchLocalesAPI();
});

// Get Spanish Locales API Endpoint - ORACLE
app.get("/get-spanish-locales", (req, res) => {
  let getEnglishLocalesAPI = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      // const result = await execute(
      //   `SELECT lb.lable as lable, lng.text as lang_en FROM tb_languages as lng JOIN tb_labels as lb ON lb.id = lng.lable_id WHERE lng.language = "en" AND (lb.status = 1 AND lng.status = 1)`
      // );

      const result1 = await execute(`SELECT * FROM tb_languages`);
      const result2 = await execute(`SELECT * FROM tb_labels`);

      if (result1 && result2) {
        const result = [];
        result1.rows.map((i) => {
          result2.rows.map((a) => {
            if (i[2] === "en" && a[2] === 1 && i[4] === 1) {
              result.push({ label: a[1], lang_en: i[3] });
            }
          });
        });
        // return result;

        for (let i = 0; i < result.length; i++) {
          const label = result[i].label;
          const lang_en = result[i].lang_en;

          response.push({
            [label]: lang_en,
          });
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getEnglishLocalesAPI();
});

// Get Custom Menu Icon Positions API Endpoint - ORACLE
app.post("/get-custom-menu-icon-positions", (req, res) => {
  let user_id = req.body.user_id;

  let getCustomMenuIconPositionsFunc = async (user_id) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT icon_positions FROM tb_custom_icon_positions WHERE user_id=
          '${user_id}'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getCustomMenuIconPositionsFunc(user_id);
});

// Store Custom Menu Icon Positions API Endpoint - ORACLE
app.post("/store-custom-menu-icon-positions", (req, res) => {
  let user_id = req.body.user_id;
  let icon_path = req.body.icon_path;
  let icon_positions = req.body.icon_positions;

  let storeCustomMenuIconPositionsFunc = async (
    user_id,
    icon_path,
    icon_positions
  ) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });
      const execute = util.promisify(db.execute).bind(db);

      const rows = await execute(
        `SELECT * FROM tb_custom_icon_positions WHERE icon_path =
          '${icon_path}'
          `
      );

      if (rows.length > 0) {
        const rows = await execute(
          `UPDATE tb_custom_icon_positions SET icon_positions =
            '${icon_positions}' WHERE icon_path = 
            '${icon_path}'
            `
        );

        if (rows.length > 0) {
          res.send("Menu Icon Position Updated Successfully");
        }
      } else {
        const rows = await execute(
          `INSERT INTO tb_custom_icon_positions (user_id, icon_path, icon_positions) VALUES (
            '${user_id}',
            '${icon_path}',
            '${icon_positions}'
            )`
        );

        if (rows.length > 0) {
          res.send("Menu Icon Position Stored Successfully");
        }
      }

      res.send(response);
    } finally {
      // conn.end();
    }
  };

  return storeCustomMenuIconPositionsFunc(user_id, icon_path, icon_positions);
});

// Get User Device Info API Endpoint - ORACLE
app.post("/get-user-device-info", (req, res) => {
  let user_id = req.body.user_id;

  let getUserDeviceInfoFunc = async (user_id) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT * FROM TB_USER_DEVICE_INFO WHERE user_id = '${user_id}' ORDER BY last_login DESC OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getUserDeviceInfoFunc(user_id);
});

// Store User Device Info API Endpoint - ORACLE
app.post("/store-user-device-info", (req, res) => {
  let user_id = req.body.user_id;
  let user_agent = req.headers["user-agent"];

  let storeUserDeviceInfoFunc = async (user_id, user_agent) => {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    const execute = util.promisify(db.execute).bind(db);

    try {
      // Get IP Address
      let ipAddress = getIPAddress().address;

      // Get Mac Address
      let macAddress = getIPAddress().mac;

      // Get Browser
      let browser = null;
      if (/firefox/i.test(user_agent)) browser = "Mozilla Firefox";
      else if (/chrome/i.test(user_agent)) browser = "Google Chrome";
      else if (/safari/i.test(user_agent)) browser = "Safari";
      else if (/msie/i.test(user_agent)) browser = "Microsoft Edge";
      else browser = user_agent;

      // async function getUsersGeolocation() {
      //   const response = await fetch(
      //     `http://controllers.ipstack.com/${ipAddress}?access_key=${IPSTACK_API_KEY}`
      //   );
      //   const json = await response.json();
      //   return json;
      // }

      // let location = getUsersGeolocation();

      let location;

      // location = location.region_name ? location.region_name : "UNKNOWN";

      location = "UNKNOWN";

      async function insertUserDeviceInfo() {
        const response = await execute(
          `INSERT INTO TB_USER_DEVICE_INFO (id, user_id, ip_address, mac_address, browser, location) VALUES (
            '${new Date().getTime()}',
            '${user_id}',
            '${ipAddress}',
            '${macAddress}',
            '${browser}',
            '${location}'
            )`
        );

        if (response) {
          res.send("Device Details Has Been Stored Successfully");
        }
      }

      return insertUserDeviceInfo();

      // })();
    } finally {
      // conn.end();
    }
  };

  return storeUserDeviceInfoFunc(user_id, user_agent);
});

// Get Account Summary - ORACLE
app.post("/get-account-summary", (req, res) => {
  let account_number = req.body.account_number;

  let getAccountSummary = async (account_number) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data =
        await execute(`SELECT Account_Name ,Ledger_Balance, Account_Limit, 
   Uncleared_Balance, Availabe_Balance, Account_Status, 
   Account_Branch, Currency, Product FROM BANKOWNER.Vw_acct_bal_enq WHERE ACCT_LINK =
          '${account_number}'`);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(
            JSON.parse("{" + arr0.replace(/,\s*$/, "").replace(/\s/g, "") + "}")
          );
        }

        // console.log(response);

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getAccountSummary(account_number);
});

// Get Menus By Menu Level's API Endpoint - ORACLE
app.post("/get-account-details-by-account-number", (req, res) => {
  let account_number = req.body.account_number;

  let getAccountDetailsByAccountLinkFunc = async (account_number) => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";
      // node native promisify
      const execute = util.promisify(db.execute).bind(db);
      const data = await execute(
        `SELECT * FROM BANKOWNER.VW_CASA_LEDGER WHERE ACCT_LINK =
          '${account_number}'`
      );

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  return getAccountDetailsByAccountLinkFunc(account_number);
});

// Store System Audit Logs API Endpoint - ORACLE
app.post("/store-system-audit-logs", (req, res) => {
  let user_id = req.body.user_id;
  let page_accessed = req.body.page_accessed;
  let page_url = req.body.page_url;
  let user_agent = req.headers["user-agent"];

  let storeSystemAuditLogsFunc = async (
    user_id,
    user_agent,
    page_accessed,
    page_url
  ) => {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });
    const execute = util.promisify(db.execute).bind(db);

    try {
      // Get IP Address
      let ipAddress = getIPAddress().address;

      // Get Mac Address
      let macAddress = getIPAddress().mac;

      // Get Browser
      let browser = null;
      if (/firefox/i.test(user_agent)) browser = "Mozilla Firefox";
      else if (/chrome/i.test(user_agent)) browser = "Google Chrome";
      else if (/safari/i.test(user_agent)) browser = "Safari";
      else if (/msie/i.test(user_agent)) browser = "Microsoft Edge";
      else browser = user_agent;

      // async function getUsersGeolocation() {
      //   const response = await fetch(
      //     `http://controllers.ipstack.com/${ipAddress}?access_key=${IPSTACK_API_KEY}`
      //   );
      //   const json = await response.json();
      //   return json;
      // }

      // let location = getUsersGeolocation();

      // location = location.region_name ? location.region_name : "UNKNOWN";

      let location = "UNKNOWN";

      async function insertSystemAuditLogs() {
        const response = await execute(
          `INSERT INTO TB_SYSTEM_AUDIT_LOGS (id, user_id, ip_address, mac_address, browser, login_location, page_accessed, page_url) VALUES (
            '${new Date().getTime()}',
            '${user_id}',
            '${ipAddress}',
            '${macAddress}',
            '${browser}',
            '${location}',
            '${page_accessed}',
            '${page_url}'
            )`
        );

        if (response) {
          res.send("System Audit Log Has Been Stored Successfully");
        }
      }

      return insertSystemAuditLogs();

      // })();
    } finally {
      // conn.end();
    }
  };

  storeSystemAuditLogsFunc(user_id, user_agent, page_accessed, page_url);
});

// Get System Audit Logs API Endpoint - ORACLE
app.get("/get-system-audit-logs", (req, res) => {
  let getSystemAuditLogsFunc = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      const resp = [];
      let arr0 = "";

      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT * FROM TB_SYSTEM_AUDIT_LOGS WHERE ROWNUM <= 100 ORDER BY id DESC`
      );

      // console.log(data);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        for (let i = 0; i < response.length; i++) {
          const counter = i + 1;
          const user_id = response[i].user_id;
          const last_login = response[i].last_login.substring(0, 28);
          const ip_address = response[i].ip_address;
          // const mac_address = response[i].mac_address;
          // const login_location = response[i].login_location;
          const page_accessed = response[i].page_accessed;
          const page_url = response[i].page_url;

          resp.push([
            counter,
            user_id,
            last_login,
            ip_address,
            // mac_address,
            // login_location,
            page_accessed,
            page_url,
          ]);
        }
      }

      res.send(resp);
    } finally {
      // conn.end();
    }
  };

  getSystemAuditLogsFunc();
});

// Get Code Details
app.post("/get-code-details", (req, res) => {
  const code = "'" + req.body.code + "'";

  async function getCodeDetails() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT description, actual_code, ltrim(rtrim(short_descrp,0)) short_descrp 
      FROM code_desc
      WHERE code_type = ${code}`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][0];
          const actual_code = data.rows[i][1];
          const short_descrp = data.rows[i][2];

          arr.push({
            description: description,
            actual_code: actual_code,
            short_descrp: short_descrp,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getCodeDetails();
});

// Select Product Group
app.get("/get-product-group", (req, res) => {
  async function getProductGroup() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT DISTINCT ACTUAL_CODE, DESCRIPTION
        FROM CODE_DESC  where code_type='ACT' and Actual_code in ('1','2') ORDER BY ACTUAL_CODE`
      );

      // res.send("get started")

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const label = data.rows[i][1];
          const value = data.rows[i][0];

          arr.push({
            label: label,
            value: value,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getProductGroup();
});

// Select Product Group
app.post("/get-product-sub-group", (req, res) => {
  const productGroup = req.body.productGroup;

  async function getProductSubGroup() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT PROD_CODE, DESCRIPTION
FROM VW_PRODUCT_ACCTOPEN
WHERE Prod_group= '${productGroup}' 
AND PROD_CUST_TYPE IN ('B', 'I')
ORDER BY PROD_CODE `
      );

      // res.send("get started")

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const label = data.rows[i][1];
          const value = data.rows[i][0];

          arr.push({
            label: label,
            value: value,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getProductSubGroup();
});

// Select Introductory Source
app.get("/get-introductory-source", (req, res) => {
  async function getIntroSource() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT (F_NAME || ' ' || M_NAME || ' ' || S_NAME), ID FROM PERSONAL_INFO`
      );

      // res.send("get started")
      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const label = data.rows[i][0];
          const value = data.rows[i][1];

          arr.push({
            label: label,
            value: value,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getIntroSource();
});

// // Select Sectors
app.get("/get-sector", (req, res) => {
  async function getSector() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `select actual_code, description, class_code from code_desc where code_type = 'MAS'`
      );

      // res.send("get started")

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][1];
          const actual_code = data.rows[i][0];
          const class_code = data.rows[i][2];

          arr.push({
            description: description,
            actual_code: actual_code,
            class_code: class_code,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getSector();
});

// Sub Sector
app.post("/get-sub-sector", (req, res) => {
  const sectorClassCode = req.body.sectorClassCode;

  async function getSubSector() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `select DESCRIPTION
as label, ACTUAL_CODE as value       from code_desc
      where
      code_type = '${sectorClassCode}'`
      );

      // res.send("get started")

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][1];
          const actual_code = data.rows[i][0];
          const short_descrp = data.rows[i][2];

          arr.push({
            description: description,
            actual_code: actual_code,
            short_descrp: short_descrp,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getSubSector();
});

// get Currencies
app.post("/currencies", (req, res) => {
  const type_of_acct = req.body.type_of_acct;

  async function getCurrenciesFromUserAccount() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(`SELECT CURRENCY_CODE, DESCRIPTION
        FROM tb_currency
        WHERE APP_FLAG = 'Y' AND CURRENCY_CODE IN (
          SELECT DISTINCT currency
          FROM control_totals_acct
          WHERE PROD_CODE = '${type_of_acct}'
        )
      `);

      // res.send("get started")

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][1];
          const actual_code = data.rows[i][0];
          const short_descrp = data.rows[i][2];

          arr.push({
            description: `${actual_code} - ${description}`,
            actual_code: `${actual_code} - ${description}`,
            short_descrp: short_descrp,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getCurrenciesFromUserAccount();
});

app.post("/getBalance", (req, res) => {
  const accountNumber = req.body.accountNumber;

  // console.log(req.body, "accountNumber");

  async function getBalanceEnquiry() {
    let con;
    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT 
    (SELECT sum(nvl(vw_tas.DB_AMT,0)) FROM vw_total_arrears vw_tas WHERE vw_tas.ACCT_LINK = vw_le.ACCOUNT_NUMBER) as total_arrears,
    (SELECT nvl(ud.DB_AMT,0) FROM unapp_debit ud WHERE ud.acct_link = vw_le.ACCOUNT_NUMBER) as unapp_debit,
    vw_al.POST_BOOKBAL, 
    vw_al.POST_AV_BAL, 
    vw_le.CURRENCY_NAME, 
    vw_le.PRODUCT_DESCRP, 
    vw_le.BRANCH_DESCRP, 
    vw_le.ACCOUNT_DESCRP, 
    vw_le.STATUS_DESCRP, 
    vw_le.CUMULATIVE_INTEREST, 
    vw_le.OD_INTEREST_AMOUNT, 
    vw_le.COT_AMOUNT, 
    vw_le.ARREARS_INT, 
    vw_le.CR_INT_RATE, 
    vw_le.OD_INT_RATE, 
    vw_le.COT_RATE, 
    vw_le.ARREARS_INT_RATE, 
    vw_le.OD_INTIN_SUSP, 
    vw_le.PEN_INTIN_SUSP, 
    vw_le.ARREARS_INTIN_SUSP, 
    vw_le.OVERDRAWN_LIMIT, 
    vw_le.LIEN_AMOUNT, 
    vw_le.SHADOW_UNCLEARED, 
    vw_le.SHADOW_BALANCE_TODAY
FROM VW_LEDGER_ENQ vw_le 
INNER JOIN VW_ALL_LEDGER vw_al ON vw_al.acct_link = vw_le.ACCOUNT_NUMBER 
WHERE vw_le.ACCOUNT_NUMBER = '${accountNumber}'`
      );

      let response = [];
      let arr0 = "";

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }

      // res.send({ data });
      // console.log(data.rows, "data");
    } catch (err) {
      res.send(err);
    }
  }
  getBalanceEnquiry();
});

app.get("/get-dates", (req, res) => {
  // res.send("ghghg");

  async function getDates() {
    let con;
    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT to_char(add_months(last_day(posting_date),-1)+1,'YYYY-MM-DD') as start_date,to_char(posting_date,'YYYY-MM-DD') as end_date
             FROM parameters
            `
      );

      // res.send(data);
      let response = [];
      let arr0 = "";

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }
          // res.send(data);
          // res.send(arr0);
          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
          res.send(response);
        }

        // res.send(response);
        return;
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }

      // res.send(data);
      // localStorage.setItem("codescs", data);
      // console.log(res)

      // localStorage.getItem("codescs");
      // console.log(data.rows)
    } catch (err) {
      res.send(err);
    }
  }
  getDates();
});

app.post("/getTrans", (req, res) => {
  const accountNumber = req.body.accountNumber;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  // console.log(req.body, "accountNumber");

  async function getTrans() {
    let con;
    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT to_char(POSTING_DATE,'DD-MON-YYYY') as POSTING_DATE, to_char(VALUE_DATE,'DD-MON-YYYY') as VALUE_DATE,TRANSACTION_DETAILS,DOCUMENT_REF,BATCH_NO,LOCAL_EQUIVALENT_DB,LOCAL_EQUIVALENT_CR
             FROM vw_actrans_all
             WHERE ACCOUNT_NUMBER = '${accountNumber}'
             AND POSTING_DATE BETWEEN '${startDate}' 
             AND '${endDate}'
            `
      );

      let response = [];
      let arr0 = "";

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }

      // res.send(data);
      // console.log(data.rows, "data");
    } catch (err) {
      res.send(err);
    }
  }
  getTrans();
});

app.post("/cash-withdrawal", (req, res) => {
  let cashWithdrawalAPI = require("./controllers/teller/cash-withdrawal");

  let account_number = req.body.account_number;
  let amount = req.body.amount;
  let voucher_date = req.body.voucher_date;
  let transaction_details = req.body.transaction_details;
  let username = req.body.username;
  let approved_by = req.body.approved_by;
  let machine_id = req.body.machine_id;
  let branch = req.body.branch;
  let batch_no = req.body.batch_no;
  let document_ref = req.body.document_ref;
  let narration = req.body.narration;
  let trans_ref = req.body.trans_ref;
  let source_of_funds = req.body.source_of_funds;
  let form_code = req.body.form_code;

  cashWithdrawalAPI
    .cashWithdrawalFunc(
      account_number,
      amount,
      voucher_date,
      transaction_details,
      username,
      approved_by,
      machine_id,
      branch,
      batch_no,
      document_ref,
      narration,
      trans_ref,
      source_of_funds,
      form_code
    )
    .then((result) => {
      // console.log(result);
      // if (result) {
      res.send(result);
      // }
    });
});

app.post("/cash-deposit", (req, res) => {
  let cashDepositAPI = require("./controllers/teller/cash-deposit");

  let account_number = req.body.account_number;
  let amount = req.body.amount;
  let voucher_date = req.body.voucher_date;
  let transaction_details = req.body.transaction_details;
  let username = req.body.username;
  let approved_by = req.body.approved_by;
  let machine_id = req.body.machine_id;
  let branch = req.body.branch;
  let batch_no = req.body.batch_no;
  let document_ref = req.body.document_ref;
  let narration = req.body.narration;
  let trans_ref = req.body.trans_ref;
  let source_of_funds = req.body.source_of_funds;
  let form_code = req.body.form_code;

  cashDepositAPI
    .cashDepositFunc(
      account_number,
      amount,
      voucher_date,
      transaction_details,
      username,
      approved_by,
      machine_id,
      branch,
      batch_no,
      document_ref,
      narration,
      trans_ref,
      source_of_funds,
      form_code
    )
    .then((result) => {
      // console.log(result);
      // if (result) {
      res.send(result);
      // }
    });
});

// GET TRANS TYPE
app.get("/get-trans-type", (req, res) => {
  // const code = "'"+req.body.code+"'";

  async function getTransType() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `select CODE_DESC DESCRIPTION,  A.SYS_CODE  ACTUAL_CODE , A.SYS_CODE
     from   code_desc b, sysgen_transactions a
    where   b.code_type = 'TR'
     and    a.actual_code = b.actual_code
     AND A.SYS_CODE in (SELECT tr_code FROM batch_transcode)`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const description = data.rows[i][0];
          const actual_code = data.rows[i][1];

          arr.push({
            description: description,
            actual_code: actual_code,
          });
        }

        res.send(arr);
        // console.log(arr)
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getTransType();
});

//GET CURRENCY
app.get("/get-currency-breado", (req, res) => {
  // const code = "'"+req.body.code+"'";

  async function getCurrency() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `select iso_code, description from tb_currency`
      );

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const actual_code = data.rows[i][0];
          const description = data.rows[i][1];

          arr.push({
            actual_code: actual_code,
            description: description,
          });
        }

        res.send(arr);
        // console.log(arr)
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  }

  getCurrency();
});

app.post("/loan-classification", (req, res) => {
  // console.log(req.body);
  let query = "";
  const classification = req.body.classification;
  const request_provision_from = req.body.requestProvisionFrom?.replace(
    "%",
    ""
  );
  const request_provision_to =
    req.body.requestProvisionTo?.replace("%", "") || "100";
  const column = req.body.column;

  const order = req.body.order;
  const start_date = req.body.startDate;
  let end_date = req.body.endDate;
  if (start_date) {
    if (!end_date) {
      end_date =
        new Date(Date.now()).getDate() +
        "-" +
        new Date(Date.now())
          .toLocaleString("default", { month: "short" })
          .toUpperCase() +
        "-" +
        new Date(Date.now()).getFullYear();
    } else {
      end_date = end_date;
    }
  }

  if (!start_date) {
    query = ` WHERE RUN_DATE='31-OCT-2018'`;
  }
  if (start_date) {
    query += ` WHERE RUN_DATE BETWEEN TO_DATE('${start_date}', 'DD-MON-YYYY') AND TO_DATE('${end_date}', 'DD-MON-YYYY')`;
  }

  if (classification) {
    query += ` AND Classification = '${classification}'`;
  }
  if (request_provision_from) {
    query += ` AND TO_NUMBER(REPLACE(req_provision, '%')) BETWEEN ${request_provision_from} AND ${request_provision_to}`;
  }
  if (column) {
    if (column === "req_provision") {
      query += ` ORDER BY TO_NUMBER(REGEXP_REPLACE(${column}, '%')) ${order}`;
    } else {
      query += ` ORDER BY ${column} ${order}`;
    }
  }

  const queryCommand =
    `SELECT Classification, balance, req_provision, cur_prov_amt  FROM vw_SASRA_FORM2D` +
    query;
  // console.log(queryCommand);
  async function getCodeDetails() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // if (con) {
      //   console.log("con");
      // } else {
      //   console.log("no con");
      // }
      const data = await con.execute(queryCommand);

      // return res.send(data);
      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const classification =
            data.rows[i][0] === null ? " - " : data.rows[i][0];
          const balance = data.rows[i][1] === null ? " - " : data.rows[i][1];
          const request_provision =
            data.rows[i][2] === null ? " - " : data.rows[i][2];
          const currency_provision_amount =
            data.rows[i][3] === null ? " - " : data.rows[i][3];

          const bal = formatAmount(balance);
          const curr_prov_amt = formatAmount(currency_provision_amount);

          arr.push({
            classification,
            bal,
            request_provision,
            curr_prov_amt,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  getCodeDetails();
});

//GET ACCOUNT NAME
app.post("/get-account-name", (req, res) => {
  async function getAccountName() {
    let con;
    const account_number = "'" + req.body.account_number + "'";
    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      if (con) {
        // console.log("i dey inside");
      }

      const data = await con.execute(
        `SELECT ACCOUNT_DESCRP
          FROM BANKOWNER.VW_CASA_LEDGER
          WHERE ACCT_LINK=${account_number}`
      );
      // res.send(data.rows)

      if (data.rows) {
        const arr = [];

        // console.log(data);
        for (let i = 0; i < data.rows.length; i++) {
          const account_descrp = data.rows[i][0];

          arr.push({
            account_description: account_descrp,
          });
        }

        res.send(arr);
      } else {
        res.send("error");
        // console.log(err);
      }
    } catch (err) {
      throw err;
    }
  }
  getAccountName();
});

// GET BRANCH HUBERT
app.get("/get-branch", (req, res) => {
  async function getBranch() {
    try {
      const con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      // return res.send("ghamna");
      // res.send(con);
      const data = await con.execute(
        `SELECT TB_BRANCH.BR_CODE, TB_BRANCH.BR_DESCRIPTION
        FROM TB_BRANCH`
      );
      if (data) {
        // res.send(response);

        var arr0 = "";
        var arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          arr.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        return res.send(arr);

        // res.send({
        //   responseCode: "000",
        //   responseMessage : arr
        // });
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } catch (err) {
      console.log(err);
      res.send("err");
    }
  }
  getBranch();
});
// GET LEAVES LOV HUBERT
app.post("/get-number-of-leaves", (req, res) => {
  const code = req.body.code;

  async function numberOfLeaves() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `select description,actual_code,ltrim(rtrim(short_descrp,0)) short_descrp 
        from code_desc 
        where code_type='CHL' and CLASS_CODE= '${code}'`
      );
      // res.send(data);
      if (data) {
        // res.send(response);

        var arr0 = "";
        var arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          arr.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        return res.send(arr);

        // res.send({
        //   responseCode: "000",
        //   responseMessage : arr
        // });
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  numberOfLeaves();
});

// Post Loan General Enquiry API Endpoint - ORACLE
app.post("/loan-general-enquiry", (req, res) => {
  const {name, customer_number , facility_account, facility_no } = req.body;
  let determinant = "";
  // let determinant = "";

  console.log(facility_account)
  if (name) {
    determinant = `NAME LIKE '%${name}%'`;
  }

  if(customer_number){
    if(determinant){
      determinant = ` AND CUSTOMER NUMBER = '${customer_number}'`
    } else {
      determinant = ` CUSTOMER_NUMBER = '${customer_number}'`
    }
  }

  let getGeneralLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";


      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      if(facility_account){
        const data = await execute(
          `SELECT * FROM REPAYMENT_SCHD_HDNEW WHERE principal_account = '${facility_account}'`
        );
  
        
  
        // return res.send(data);
  
        if (data) {
          for (let i = 0; i < data.rows.length; i++) {
            for (let x = 0; x < data.metaData.length; x++) {
              arr0 +=
                '"' +
                [data.metaData[x].name.toLowerCase()] +
                '" : "' +
                data.rows[i][x] +
                '",';
            }
  
            response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
          }
  
          res.send(response);
          // console.log(response);
        } else {
          res.send("Something went wrong... Nothing was returned!!");
        }
      }else if(facility_no){
        const data = await execute(
          `SELECT * FROM R_SCHEDULE_TEMP WHERE FACILITY_NO = '${facility_no}'`
        );
  
        
  
        // return res.send(data);
  
        if (data) {
          for (let i = 0; i < data.rows.length; i++) {
            for (let x = 0; x < data.metaData.length; x++) {
              arr0 +=
                '"' +
                [data.metaData[x].name.toLowerCase()] +
                '" : "' +
                data.rows[i][x] +
                '",';
            }
  
            response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
          }
  
          res.send(response);
          // console.log(response);
        } else {
          res.send("Something went wrong... Nothing was returned!!");
        }
      } else{
        const data = await execute(
          `SELECT * FROM VW_LOAN_GEN_ENQnew WHERE ${determinant}`
        );
  
        
  
        // return res.send(data);
  
        if (data) {
          for (let i = 0; i < data.rows.length; i++) {
            for (let x = 0; x < data.metaData.length; x++) {
              arr0 +=
                '"' +
                [data.metaData[x].name.toLowerCase()] +
                '" : "' +
                data.rows[i][x] +
                '",';
            }
  
            response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
          }
  
          res.send(response);
          // console.log(response);
        } else {
          res.send("Something went wrong... Nothing was returned!!");
        }
      }
    } finally {
      // conn.end();
    }
  };

  getGeneralLoanEnquiry();
});

// Get Loan General Enquiry API Endpoint - ORACLE
app.get("/get-loan-general-enquiry", (req, res) => {

  let getGeneralLoanEnquiry = async () => {
    try {
      const db = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const response = [];
      let arr0 = "";


      // node native promisify
      const execute = util.promisify(db.execute).bind(db);

      const data = await execute(
        `SELECT NAME FROM VW_LOAN_GEN_ENQnew`
      );

      

      // return res.send(data);

      if (data) {
        for (let i = 0; i < data.rows.length; i++) {
          for (let x = 0; x < data.metaData.length; x++) {
            arr0 +=
              '"' +
              [data.metaData[x].name.toLowerCase()] +
              '" : "' +
              data.rows[i][x] +
              '",';
          }

          response.push(JSON.parse("{" + arr0.replace(/,\s*$/, "") + "}"));
        }

        res.send(response);
        // console.log(response);
      } else {
        res.send("Something went wrong... Nothing was returned!!");
      }
    } finally {
      // conn.end();
    }
  };

  getGeneralLoanEnquiry();
});




// GET ACCOUNT DETAILS BY BY ACCOUNT NUMBER HUBERT
app.post("/get-account-details", (req, res) => {
  const accountNumber = req.body.accountNumber;
  async function getAccountDetails() {
    let con;

    try {
      con = await oracledb.getConnection({
        user: DB_USER,
        password: DB_PASSWORD,
        connectString: DB_CONNECTION_STRING,
      });

      const data = await con.execute(
        `SELECT 
         ACCT_LINK, AV_BAL, BOOKBAL, 
         OD_LIM, POST_AV_BAL, POST_BOOKBAL, 
         POST_OD_LIM, SYSPOST_AV_BAL, UNCLEARED_BAL, 
         ACCOUNT_NUMBER, ACCOUNT_DESCRP, POST_ACCT_DESCRP, 
         BRANCH_CODE, BRDESC, STATUS_INDICATOR, 
         STATUS_DESC, CURRENCY_CODE, GET_CURRDESC(CURRENCY_CODE) Currency, LFM_TEMP, 
         MAX_DEPO_AMT, DEPO_ALLOW, MAX_WITHD_AMT, 
         WITHD_ALLOW, PROD_CODE, UNAUTH_OD, 
         CHQ_ALLOWED, CHQ_DEPO_ALLOW, TYPE_OF_ACCT, 
         LEGAL_FORM, CUST_NO, CASH_FLAG, 
         CHQ_FLAG, ACR_CHG, ACR_PENAL, 
         ACR_INT, VIEW_FLAG
      FROM BANKOWNER.VW_CASA_LEDGER Where acct_link = '${accountNumber}'
      `
      );
      // return res.send(data)
      const data2 = await con.execute(`select nvl(c_type,'GL')
    from customer a where 
    a.customer_number  = get_customerno('${accountNumber}')
  `);

      if (data.rows) {
        const arr = [];

        for (let i = 0; i < data.rows.length; i++) {
          const ACCT_LINK = data.rows[i][0];
          const AV_BAL = data.rows[i][1];
          const BOOKBAL = data.rows[i][2];
          const OD_LIM = data.rows[i][3];
          const POST_AV_BAL = data.rows[i][4];
          const POST_BOOKBAL = data.rows[i][5];
          const POST_OD_LIM = data.rows[i][6];
          const SYSPOST_AV_BAL = data.rows[i][7];
          const UNCLEARED_BAL = data.rows[i][8];
          const ACCOUNT_NUMBER = data.rows[i][9];
          const ACCOUNT_DESCRP = data.rows[i][10];
          const POST_ACCT_DESCRP = data.rows[i][11];
          const BRANCH_CODE = data.rows[i][12];
          const BRDESC = data.rows[i][13];
          const STATUS_INDICATOR = data.rows[i][14];
          const STATUS_DESC = data.rows[i][15];
          const CURRENCY_CODE = data.rows[i][16];
          const Currency = data.rows[i][17];
          const LFM_TEMP = data.rows[i][18];
          const MAX_DEPO_AMT = data.rows[i][19];
          const DEPO_ALLOW = data.rows[i][20];
          const MAX_WITHD_AMT = data.rows[i][21];
          const WITHD_ALLOW = data.rows[i][22];
          const PROD_CODE = data.rows[i][23];
          const UNAUTH_OD = data.rows[i][24];
          const CHQ_ALLOWED = data.rows[i][25];
          const CHQ_DEPO_ALLOW = data.rows[i][26];
          const TYPE_OF_ACCT = data.rows[i][27];
          const LEGAL_FORM = data.rows[i][28];
          const CUST_NO = data.rows[i][29];
          const CASH_FLAG = data.rows[i][30];
          const CHQ_FLAG = data.rows[i][31];
          const ACR_CHG = data.rows[i][32];
          const ACR_PENAL = data.rows[i][33];
          const ACR_INT = data.rows[i][34];
          const VIEW_FLAG = data.rows[i][35];

          arr.push({
            ACCT_TYPE: data2.rows[0][0],
            ACCT_LINK: ACCT_LINK,
            AV_BAL: AV_BAL,
            BOOKBAL: BOOKBAL,
            OD_LIM: OD_LIM,
            POST_AV_BAL: POST_AV_BAL,
            POST_BOOKBAL: POST_BOOKBAL,
            POST_OD_LIM: POST_OD_LIM,
            SYSPOST_AV_BAL: SYSPOST_AV_BAL,
            UNCLEARED_BAL: UNCLEARED_BAL,
            ACCOUNT_NUMBER: ACCOUNT_NUMBER,
            ACCOUNT_DESCRP: ACCOUNT_DESCRP,
            POST_ACCT_DESCRP: POST_ACCT_DESCRP,
            BRANCH_CODE: BRANCH_CODE,
            BRDESC: BRDESC,
            STATUS_INDICATOR: STATUS_INDICATOR,
            STATUS_DESC: STATUS_DESC,
            CURRENCY_CODE: CURRENCY_CODE,
            Currency: Currency,
            LFM_TEMP: LFM_TEMP,
            MAX_DEPO_AMT: MAX_DEPO_AMT,
            DEPO_ALLOW: DEPO_ALLOW,
            MAX_WITHD_AMT: MAX_WITHD_AMT,
            WITHD_ALLOW: WITHD_ALLOW,
            PROD_CODE: PROD_CODE,
            UNAUTH_OD: UNAUTH_OD,
            CHQ_ALLOWED: CHQ_ALLOWED,
            CHQ_DEPO_ALLOW: CHQ_DEPO_ALLOW,
            TYPE_OF_ACCT: TYPE_OF_ACCT,
            LEGAL_FORM: LEGAL_FORM,
            CUST_NO: CUST_NO,
            CASH_FLAG: CASH_FLAG,
            CHQ_FLAG: CHQ_FLAG,
            ACR_CHG: ACR_CHG,
            ACR_PENAL: ACR_PENAL,
            ACR_INT: ACR_INT,
            VIEW_FLAG: VIEW_FLAG,
          });
        }

        res.send(arr);
      } else {
        res.send(err);
      }
      //   await con.close();
    } catch (err) {
      // res.send(err);
      console.log(err);
    }
  }

  getAccountDetails();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// END OF ORACLE API ENDPOINTS       /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log("server is running on port " + port);
});
