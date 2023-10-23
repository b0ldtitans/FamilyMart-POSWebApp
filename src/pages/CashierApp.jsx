import React, { useState } from "react";
import KitchenMenu from "../components/KitchenMenu";
import GroceriesMenu from "../components/GroceriesMenu";
import TransactionSidebar from "../components/TransactionSidebar";
import { GrRestaurant } from "react-icons/gr";
import { LiaShoppingBasketSolid } from "react-icons/lia";

export default function CashierApp() {
  const [activeMenuItem, setActiveMenuItem] = useState("Drinks");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <>
      <section className="flex flex-row justify-between">
        <div className="w-full">
          <div className="p-4 bg-white border shadow-md rounded-lg">
            <div className=" mt-[10px] mb-[30px] flex flex-row items-start justify-start">
              <div
                onClick={() => handleMenuItemClick("Kitchen")}
                className={`mr-10 font-bold cursor-pointer flex items-center text-lg ${
                  activeMenuItem === "Kitchen"
                    ? "text-[#01ab52] underline mb-1"
                    : "text-gray-600"
                } focus:text-[#01ab52] focus:underline`}
              >
                <GrRestaurant
                  className={`text-lg mr-2 h-[30px] w-[30px] ${
                    activeMenuItem === "Kitchen"
                      ? "text-[#01ab52] underline"
                      : "text-gray-600"
                  }`}
                />
                <span>Kitchen</span>
              </div>

              <div
                onClick={() => handleMenuItemClick("Groceries")}
                className={`mr-10 font-bold cursor-pointer flex items-center text-lg ${
                  activeMenuItem === "Groceries"
                    ? "text-[#01ab52] underline mb-1"
                    : "text-gray-600"
                } focus:text-[#01ab52] focus:underline`}
              >
                <LiaShoppingBasketSolid
                  className={`h-[30px] w-[30px] mr-2 ${
                    activeMenuItem === "Groceries"
                      ? "text-[#01ab52] underline"
                      : "text-gray-600"
                  }`}
                />
                <span>Groceries</span>
              </div>
            </div>
            {activeMenuItem === "Kitchen" ? <KitchenMenu /> : null}
            {activeMenuItem === "Groceries" ? <GroceriesMenu /> : null}
          </div>
        </div>
        <div className="w-full">
          <TransactionSidebar />
        </div>
      </section>
    </>
  );
}
