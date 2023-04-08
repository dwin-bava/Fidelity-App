require("dotenv").config();
const oracledb = require("oracledb");
var bodyParser = require("body-parser");
var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;
oracledb.autoCommit = true;
const util = require("util");

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
      return "Menu Icon Has Been Added Successfully";
    }
    
  } finally {
    // conn.end();
  }
};

module.exports.addMenuIconFunc = addMenuIconFunc;
