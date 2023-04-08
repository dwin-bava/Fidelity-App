require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

var oracledb = require("oracledb");
oracledb.autoCommit = true;
var bodyParser = require("body-parser");

const port = 3020;
const app = express();

// enable cors
app.use(cors({ origin: "*" }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set("trust proxy", true);

var ip = require("ip");

const os = require("os");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

let loginFunc = async (username, password) => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    ///////////////////////////////////////////////////////////////////////////
    const util = require("util");

    const execute = util.promisify(db.execute).bind(db);

    let result;
    const hostname = os.hostname();
    const ipAddress = ip.address();
    if (db) {
      let response;
      result = execute(
        "BEGIN prc_userlogin_process_react(:vusername, :vpassword, :global_hostname, :global_machineip, :login_code, :mess, :PD, :BR_DESC, :FNAME, :EMAIL, :LANG, :USERID,:BRACODE); END;",
        {
          vusername: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: username,
          },

          vpassword: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: password,
          },

          global_hostname: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: hostname,
          },

          global_machineip: {
            type: oracledb.STRING,
            dir: oracledb.BIND_IN,
            val: ipAddress,
          },

          login_code: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          mess: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          PD: {
            type: oracledb.DATE,
            dir: oracledb.BIND_OUT,
          },

          BR_DESC: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          FNAME: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          EMAIL: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          LANG: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          USERID: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },

          BRACODE: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
          },
        }
      );

      if (result) {

        return result;
        
      } else {
        return "Something went wrong... Nothing was returned!!";
      }
    }
  } catch (e) {
    return e;
  }
};

module.exports.loginFunc = loginFunc;
