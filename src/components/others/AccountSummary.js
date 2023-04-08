import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Skeleton } from "antd";
export default function AccountSummary({ accountNumber, setAccountName }) {
  const [res, setRes] = useState({});
  const [loading, setloading] = useState(false);
  const [isMounted, setIsMounted] = useState(1);

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  useEffect(() => {
    setIsMounted(isMounted + 1);
    async function fetchAccountDetails() {
      const response = await axios.post(
        "http://192.168.1.195:2030/get-account-summary",
        {
          account_number: accountNumber,
        }
      );

      console.log(response, "res");
      if (response.data.length === 0) {
        setRes({});
        setAccountName("");
        setloading(false);
      } else {
        const { account_name, ...others } = response.data[0];
        setAccountName(account_name);
        setRes(others);
        setloading(false);
      }
    }
    if (isMounted === 1) {
      setloading(false);
      fetchAccountDetails();
    } else {
      setloading(true);
      fetchAccountDetails();
    }
  }, [accountNumber]);
  console.log(isMounted, "from grid");
  const [title, setTitle] = useState("");
  return (
    <>
      <table className="w-full bg-white rounded-sm table-auto border-separate border-spacing-2 border border-slate-500">
        {/* <tr
          className="py-1 font-semibold text-white"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,
          }}
        >
          <td colSpan={2} className="w-1/2 px-2 py-[5px] text-center uppercase">
            Account Summary
          </td>
        </tr> */}
        <tbody>
          <tr
            className="py-1 font-semibold text-white "
            style={{
              background:
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`,
            }}
          >
            <td className="w-1/2 px-2">Description</td>
            <td className="w-1/2 px-2">Value</td>
          </tr>
          {!loading &&
            Object.entries(res)?.map((i, key) => {
              return (
                <tr
                  key={key}
                  className="border-spacing-2 border border-slate-500"
                >
                  <td
                    style={{
                      background: getTheme.theme.navBarColor,
                    }}
                    className=" border border-slate-500  w-1/2 capitalize px-2"
                  >
                    {i[0].replace("_", " ")}
                  </td>
                  <td className=" border border-slate-500  bg-[whitesmoke] w-1/2 px-2">
                    {i[1] === "null" ? "" : i[1]}
                  </td>
                </tr>
              );
            })}
        </tbody>
        {loading && (
          <tfoot className="">
            <tr>
              <td>
                <Skeleton active />
              </td>
              <td>
                <Skeleton active />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
}
