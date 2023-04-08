require("dotenv").config();
var bodyParser = require("body-parser");
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

var oracledb = require("oracledb");
oracledb.autoCommit = true;
const util = require("util");

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
      return "Updated Successfully";
    }
  } finally {
    // conn.end();
  }
};

module.exports.updateMenuDetailsFunc = updateMenuDetailsFunc;
