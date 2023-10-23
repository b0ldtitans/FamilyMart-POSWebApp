import React, { useState } from "react";
import NewCashier from "../components/NewCashier";
import CashierList from "../components/CashierList";

export default function CashierControlPanel({ onMenuItemClick }) {
  const [activeMenuItem, setActiveMenuItem] = useState("CashierList");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#01AB52] mb-4">
        Cashier Control Panel
      </h1>
      <div className=" mt-[10px] mb-[30px] flex flex-row items-start justify-start">
        <button
          onClick={() => handleMenuItemClick("CashierList")}
          className={`mr-10 font-bold ${
            activeMenuItem === "CashierList"
              ? "text-[#01ab52] underline mb-1"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          View Cashier
        </button>
        <button
          onClick={() => handleMenuItemClick("NewCashier")}
          className={`mr-10 font-bold ${
            activeMenuItem === "NewCashier"
              ? "text-[#01ab52] underline"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          Add Cashier
        </button>
      </div>
      {activeMenuItem === "NewCashier" ? <NewCashier /> : null}
      {activeMenuItem === "CashierList" ? <CashierList /> : null}
    </div>
  );
}
