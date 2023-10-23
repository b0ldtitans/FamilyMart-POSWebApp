import React, { useState } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import { PiCalculatorThin } from "react-icons/pi";
import image1 from "../assets/familymartwhite svg.svg";
import UserAvatar from "./Avatar";

const AdminSideBar = ({ onMenuItemClick }) => {
  const [isReportExpanded, setIsReportExpanded] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const toggleReportMenu = () => {
    setIsReportExpanded(!isReportExpanded);
  };

  return (
    <div className="flex bg-[#01AB52] shadow-md">
      <div className="w-72 h-screen p-5 pt-8 flex flex-col justify-between">
        <div>
          <div className="flex gap-x-4 items-center">
            <img
              src={image1}
              alt="logo"
              className="cursor-pointer h-[70px] w-[160px] ml-[25px]"
            />
          </div>
          <div className="mt-8">
            <ul>
              {/* <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg">
                <MdDashboard className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Dashboard</span>
              </li> */}
              <li
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                onClick={toggleReportMenu}
              >
                <VscGraphLine className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Report</span>
              </li>
              {isReportExpanded && (
                <>
                  <li
                    onClick={() => onMenuItemClick("SalesReport")}
                    className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                  >
                    {/* Add Sales Report Icon */}
                    <TbReportMoney className="h-[20px] w-[20px]" />
                    <span className="p-2 rounded-md">Sales Report</span>
                  </li>
                  <li
                    onClick={() => onMenuItemClick("Transaction")}
                    className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                  >
                    {/* Add Transaction Icon */}
                    <PiCalculatorThin className="h-[20px] w-[20px]" />
                    <span className="p-2 rounded-md">Transaction</span>
                  </li>
                </>
              )}
              <li
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                onClick={() => onMenuItemClick("ProductControlPanel")}
              >
                <GiCardboardBox className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Product</span>
              </li>

              <li
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                onClick={() => onMenuItemClick("Cashier")}
              >
                <BsFillPersonFill className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Cashier</span>
              </li>
              <li
                onClick={() => onMenuItemClick("Setting")}
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
              >
                <GoGear className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Setting</span>
              </li>
              <li
                onClick={logoutHandler}
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
              >
                <MdLogout className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
