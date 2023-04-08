require("dotenv").config();

var bodyParser = require("body-parser");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

var oracledb = require("oracledb");
const util = require("util");

let response = [];

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

      return response;

    } else {
      return "Something went wrong... Nothing was returned!!";
    }
    
  } finally {
    // conn.end();
  }
};

module.exports.getSubMenusByParentMenuIDFunc = getSubMenusByParentMenuIDFunc;
