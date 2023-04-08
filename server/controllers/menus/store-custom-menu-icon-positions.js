require("dotenv").config();

var bodyParser = require("body-parser");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

var oracledb = require("oracledb");
const util = require("util");

let response = [];

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
        return "Menu Icon Position Updated Successfully";
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
        return "Menu Icon Position Stored Successfully";
      }
    }

    return response;
  } finally {
    // conn.end();
  }
};

module.exports.storeCustomMenuIconPositionsFunc =
  storeCustomMenuIconPositionsFunc;
