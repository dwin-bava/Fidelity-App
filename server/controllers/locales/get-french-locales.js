require("dotenv").config();
var oracledb = require("oracledb");
var bodyParser = require("body-parser");

var DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING_ORACLE;
var DB_USER = process.env.DB_USER_ORACLE;
var DB_PASSWORD = process.env.DB_PASSWORD_ORACLE;

const util = require("util");

let response = [];

let getFrenchLocalesAPI = async () => {
  try {
    const db = await oracledb.getConnection({
      user: DB_USER,
      password: DB_PASSWORD,
      connectString: DB_CONNECTION_STRING,
    });

    // node native promisify
    const execute = util.promisify(db.execute).bind(db);
    // const result = await execute(
    //   'SELECT lb.lable as lable, lng.text as lang_fr FROM tb_languages as lng JOIN tb_lables as lb ON lb.id = lng.lable_id WHERE lng.language = "fr" AND (lb.status = 1 AND lng.status = 1)'
    // );

    const result1 = await execute(`SELECT * FROM tb_languages`);
    const result2 = await execute(`SELECT * FROM tb_labels`);

    if(result1 && result2){

      // return result1;
      const result = [];
      result1.rows.map((i) => {
        result2.rows.map((a) => {
          if (i[2] === "fr" && a[2] === 1 && i[4] === 1) {
            result.push({ label: a[1], lang_fr: i[3] });
          }
        });
      });

      for (let i = 0; i < result.length; i++) {
        const label = result[i].label;
        const lang_fr = result[i].lang_fr;

        response.push({
          [label]: lang_fr,
        });
      }

      return response;

    } else {
      return "Something went wrong... Nothing was returned!!";
    }

  } finally {
    // conn.end();
  }
};

module.exports = getFrenchLocalesAPI();
