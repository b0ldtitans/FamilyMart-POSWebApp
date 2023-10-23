import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import CashierControlPanel from "./CashierControlPanel";
import UserSetting from "./UserSettings";
import ProductControlPanel from "./ProductControlPanel";
import SalesReport from "../components/sales-menu";
import Transaction from "./Transaction";
import { format } from "date-fns";

export default function AdminMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="flex flex-row bg-gray-100 w-full">
      <AdminSidebar onMenuItemClick={handleMenuItemClick} />
      <div className="w-full content-center justify-center">
        <div className="ml-[40px] mt-[20px]">
          <span className="text-lg font-bold text-black mr-[30px]">
            {format(currentTime, "HH:mm")}
          </span>
          <span className="text-lg text-black">
            {format(currentTime, "dd MMMM yyyy")}
          </span>
        </div>
        <div className="ml-[40px] mt-[10px]">
          {activeMenuItem === "Cashier" ? <CashierControlPanel /> : null}
          {activeMenuItem === "Setting" ? <UserSetting /> : null}
          {activeMenuItem === "SalesReport" ? <SalesReport /> : null}
          {activeMenuItem === "Transaction" ? <Transaction /> : null}
          {activeMenuItem === "ProductControlPanel" ? (
            <ProductControlPanel />
          ) : null}
        </div>
      </div>
    </section>
  );
}
