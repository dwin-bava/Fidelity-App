require("dotenv").config();

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

var oracledb = require("oracledb");
const util = require("util");

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
      `SELECT * FROM TB_SYSTEM_AUDIT_LOGS ORDER BY id DESC`
    );

    console.log(data);

    if(data){

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
        const mac_address = response[i].mac_address;
        const login_location = response[i].login_location;
        const page_accessed = response[i].page_accessed;
        const page_url = response[i].page_url;

        resp.push([
          counter,
          user_id,
          last_login,
          ip_address,
          mac_address,
          login_location,
          page_accessed,
          page_url
        ]);
        
      }

      return resp;

    } else {
        return "Something went wrong... Nothing was returned!!";
    }

  } finally {
    // conn.end();
  }
};

module.exports = getSystemAuditLogsFunc();
