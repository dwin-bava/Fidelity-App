import React from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import { GiReceiveMoney } from "../../node_modules/react-icons/gi/index.esm";
import InputField from "../components/fields/InputField";
import Label from "../components/label/Label";

function CashDeposit() {
  return (
    <div>
      <div className="cash__deposit">
        <HeaderComponent title="Cash Deposit" icon={<GiReceiveMoney />} />

        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 0.35 }}>
            <InputField
              label="Credit Account"
              labelWidth={"80%"}
              required={true}
            />
          </div>

          <div style={{ flex: 0.35 }}>
            <InputField label="Credit Account" labelWidth={"20%"} />
          </div>

          <div style={{ flex: 0.3 }}>
            <Label label="Account Balance" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashDeposit;
