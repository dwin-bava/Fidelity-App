require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const app = express();

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const util = require("util");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

let loanScheduleQuotationFunc = async (
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
) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    ///////////////////////////////////////////////////////////////////////////

    const execute = util.promisify(db.execute).bind(db);

    // console.log(
    //   `BEGIN loan_schedule_quotation ('${facility_number.replace(
    //     /\s/g,
    //     ""
    //   )}',${interest_rate},${facility_amount},${
    //     principal_moratorium ? principal_moratorium : null
    //   },${
    //     interest_moratorium ? interest_moratorium : null
    //   },${loan_tenor_in_months},'${effective_date}','${interest_type}','${principal_repayment_frequency}',${
    //     principal_repayment_count ? principal_repayment_count : 12
    //   },'${schedule_start_date}',${
    //     processing_fees ? processing_fees : 0
    //   },'${last_working_day_of_the_month}','${interest_repayment_frequency}',${
    //     interest_repayment_count ? interest_repayment_count : 12
    //   },${
    //     ballon_installment_to_be_applied
    //       ? ballon_installment_to_be_applied
    //       : null
    //   },${ballon_on_installment_number ? ballon_on_installment_number : null},${
    //     first_principal_repay_date ? first_principal_repay_date : null
    //   },${last_repayment_date ? last_repayment_date : null},${
    //     legal_form ? legal_form : null
    //   },'${currency}','${exempt_month}',${
    //     net_monthly_salary ? net_monthly_salary : 0
    //   }); END;`
    // );

    let response = execute(
      `BEGIN pck_lending.loan_schedule_quotation ('${facility_number.replace(
        /\s/g,
        ""
      )}',${interest_rate},${facility_amount},${
        principal_moratorium ? principal_moratorium : null
      },${
        interest_moratorium ? interest_moratorium : null
      },${loan_tenor_in_months},'${effective_date}','${interest_type}','${principal_repayment_frequency}',${
        principal_repayment_count ? principal_repayment_count : 12
      },'${schedule_start_date}',${
        processing_fees ? processing_fees : 0
      },'${
        last_working_day_of_the_month ? last_working_day_of_the_month : 'N'
      }','${interest_repayment_frequency}',${
        interest_repayment_count ? interest_repayment_count : 12
      },${
        ballon_installment_to_be_applied
          ? ballon_installment_to_be_applied
          : null
      },${ballon_on_installment_number ? ballon_on_installment_number : null},${
        first_principal_repay_date ? first_principal_repay_date : null
      },${last_repayment_date ? last_repayment_date : null},${
        legal_form ? legal_form : null
      },'${currency}','${exempt_month}',${
        net_monthly_salary ? net_monthly_salary : 0
      }); END;`
    );

    if (response) {
      return [
        {
          responseCode: "000",
          responseMessage: "Loan Schedule Generated Successfully",
        },
      ];
    }
  } catch (e) {
    return e;
  }
};

module.exports.loanScheduleQuotationFunc = loanScheduleQuotationFunc;
