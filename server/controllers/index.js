require("dotenv").config();
var oracledb = require('oracledb');
oracledb.autoCommit = true;
var bodyParser = require('body-parser');

var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;

let testConnectionFunc = async () => {

        let response = [];

        try {

            const db = await oracledb.getConnection({
              user : DB_USER,
              password: DB_PASSWORD,
              connectString : DB_CONNECTION_STRING
            });

            if(db){
              return "Oracle Connection Established Successfully";
            } else {
              return "No Connection to Oracle Server";
            }

          } catch (err){
            // response = [{responseCode: "000", responseMessage: err}];
            return response;
          }
    
}

module.exports = testConnectionFunc();


