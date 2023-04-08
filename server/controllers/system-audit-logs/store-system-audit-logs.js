require("dotenv").config();
const express = require("express");
const cors = require("cors");
var oracledb = require('oracledb');
oracledb.autoCommit = true;
var bodyParser = require('body-parser');
var DomParser = require('dom-parser');

const port = 3021;
const app = express();

var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var IPSTACK_API_KEY = process.env.IPSTACK_API_KEY_ORACLE;

// enable cors
app.use(cors({ origin: "*", }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.set('trust proxy', true);

const fetch = require('cross-fetch');

const os = require('os');

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

var IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

const util = require("util");

let storeSystemAuditLogsFunc = async (user_id, user_agent, page_accessed, page_url) => {
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

    async function getUsersGeolocation() {
      const response = await fetch(
        `http://api.ipstack.com/${ipAddress}?access_key=${IPSTACK_API_KEY}`
      );
      const json = await response.json();
      return json;
    }

    let location = getUsersGeolocation();

    location = location.region_name ? location.region_name : "UNKNOWN";

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
        return "System Audit Log Has Been Stored Successfully";
      } 

    }

    return insertSystemAuditLogs();

    // })();
  } finally {
    // conn.end();
  }
};

module.exports.storeSystemAuditLogsFunc = storeSystemAuditLogsFunc;
