import React from "react";
import ListOfValue from "../Fields/ListOfValue";
import Label from "../Label/Label";

const HeaderComponent = ({ data, accountTypes, setAccountTypes }) => {
  function onChange(value) {
    if (value === "PERSONAL") {
      setAccountTypes("I");
    } else {
      setAccountTypes("C");
    }
  }

  // console.log(accountTypes , "acc")
  return (
    <div style={{ zoom: "0.85" }}>
      <form>
        <div className="md:flex justify-center md:space-x-10">
          <div></div>
          <div class="w-full max-w-2xl mt-2">
            {/* <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/2">
                <Label label="Customer Category" />
              </div>
              <div class="inline-block relative mr-4">
                <ListOfValue
                  defaultValue={accountTypes}
                  onChange={onChange}
                  data={data.customerCategory}
                  inputWidth="100%"  
                />
              </div>
            </div> */}
            {/* <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Customer Category" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue />
                </div>
              </div>
            </div> */}

            {/* <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Full Name" />
              </div>
              <div className="md:w-2/3 md:ml-6">
                <input class="my_inputs" type="text" />
              </div>
            </div> */}
            <div class="w-full max-w-xl mt-2 mb-2">
              <div class="md:flex md:items-center md:space-x-5">
                <div class="md:w-1/3">
                  <Label label="Type of Customer Account" />
                </div>
                <div class="inline-block relative w-64">
                  <select class="block appearance-none w-full bg-white border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>-- Select Type Of Account --</option>
                    <option>single Account</option>
                    <option>Joint Account</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          {/* <div class="w-full max-w-lg mt-2 ml-5">
            <div class="md:flex md:items-center mb-2 ml-3">
              <div class="md:w-1/3">
                <Label label="Risk ID" />
              </div>
              <div class="md:w-2/3 mr-2">
                <input className="risk_label" type="text" />
              </div>
            </div>

            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Short Name" />
              </div>
              <div className="md:w-2/3 mr-2">
                <input class="my_inputs" type="text" />
              </div>
            </div>
          </div> */}

          {/*  */}
          {/* <div class="w-full max-w-sm mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Customer ID" />
              </div>
              <div class="md:w-2/3 md:mr-10">
                <input className="my_inputs bg-gray-100" type="text" readOnly/>
              </div>
            </div>

            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Account No." />
              </div>
              <div className="md:w-2/3 md:mr-10">
                <input class="my_inputs bg-gray-100" type="text" readOnly />
              </div>
            </div>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default HeaderComponent;
