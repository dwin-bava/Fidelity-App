import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CashDeposit from "./screens/CashDeposit";
import CashCash from "./screens/CashCash";
import Loanfid from './screens/Loanfid';
import Loanapply from './screens/Loanapply';
import LoanQuo from './screens/LoanQuo';
import Login from './screens/Login';
import Approval from "./screens/Approval";
import Enquiry from "./screens/Enquiry";
import MyApprovals from "./screens/central-approval/my-approvals";

function App() {
  return (
    <div className="app" style={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quo" element={<LoanQuo />} />
          <Route path="/cash" element={<CashCash />} />
          <Route path="/fid" element={<Loanfid />} />
          <Route path="/loan" element={<Loanapply />} />
          <Route path="/apprv" element={<Approval />} />
          <Route path="/enq" element={<Enquiry />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
