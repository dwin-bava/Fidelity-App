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

let cashDepositFunc = async (
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
) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    ///////////////////////////////////////////////////////////////////////////

    if (db) {
      const execute = util.promisify(db.execute).bind(db);

      // return `'${account_number}','${amount}','${voucher_date}','BRA','${transaction_details}','CWLY','${username}','${approved_by}','${machine_id}','${branch}','CWD',${null},'${batch_no}','nvl('${document_ref}','${account_number}')','Y','${narration}','${trans_ref}','${source_of_funds}','${form_code}'`.replace(/\s+/g, "-");

      const data =
        `'${account_number}',${amount},'${voucher_date}','BRA','${transaction_details}','CDLY','${username}','${approved_by}','${machine_id}','${branch}','CDP',${null},'${batch_no}','${document_ref}','Y','${narration}','${trans_ref}',${
          source_of_funds ? source_of_funds : null
        },'${form_code}'`.replace(/\s+/g, "-");

      //   return data;

      let response = execute(`BEGIN ac_trans_savings_rel (${data}); END;`);

      if (response) {
        return [
          {
            responseCode: "000",
            responseMessage:
              "You have successfully deposited " +
              Intl.NumberFormat("en-US").format(amount) +
              " into the account " +
              account_number,
          },
        ];
      }
    }
  } catch (e) {
    return e;
  }
};

module.exports.cashDepositFunc = cashDepositFunc;
