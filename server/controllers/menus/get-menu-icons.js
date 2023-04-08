require("dotenv").config();
var oracledb = require("oracledb");
oracledb.autoCommit = true;

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

const util = require("util");

let response = [];
var arr0 = "";

let getMenuIconsAPI = async () => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    // node native promisify
    const execute = util.promisify(db.execute).bind(db);

    const data = await execute(
      `SELECT * FROM tb_menus WHERE menu_permitted = 'Y' AND bank_permission = 'Y' ORDER BY menu_groupings ASC`
    );

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

    if (response) {
      const arr1 = [];
      response.map((i) => {
        if (i.menu_level !== 0) {
          arr1.push({
            id: i.menu_id,
            title: i.menu_name,
            type: i.type_code,
            url: i.menu_url,
            icon: i.icon,
            color: i.color,
            parent_menu_id: i.parent_menu_id,
            menu_level: i.menu_level,
          });
        }
      });

      arr1.map((i) => {
        i.children = [];
        arr1.map((a) => {
          if (a.parent_menu_id === i.id) {
            i.children.push(a)
          }
        });
      });

      const arr = [];
      arr1.map((i) => {
        if (i.menu_level === "1") {
          arr.push(i);
        }
      });

      return arr1;

    } else {
      return "Something went wrong... Nothing was returned!!";
    }

  } finally {
    // db.end();
  }
};

module.exports = getMenuIconsAPI();
