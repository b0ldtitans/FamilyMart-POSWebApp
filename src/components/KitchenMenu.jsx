import React, { useState } from "react";
import FoodsMenu from "./FoodsMenu";
import DrinksMenu from "./DrinksMenu";
import SnacksMenu from "./SnacksMenu";
import ComboMenu from "./ComboMenu";

export default function KitchenMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Drinks");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <>
      <div className="p-4 ">
        <div className=" mt-[10px] mb-[30px] flex flex-row items-start justify-start">
          <button
            onClick={() => handleMenuItemClick("Drinks")}
            className={`mr-10 font-bold ${
              activeMenuItem === "Drinks"
                ? "text-[#01ab52] underline mb-1"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Drinks
          </button>
          <button
            onClick={() => handleMenuItemClick("Foods")}
            className={`mr-10 font-bold ${
              activeMenuItem === "Foods"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Foods
          </button>
          <button
            onClick={() => handleMenuItemClick("Snacks")}
            className={`mr-10 font-bold ${
              activeMenuItem === "Snacks"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Snacks
          </button>
          <button
            onClick={() => handleMenuItemClick("Combo")}
            className={`mr-10 font-bold ${
              activeMenuItem === "Combo"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Combo
          </button>
        </div>
        {activeMenuItem === "Foods" ? <FoodsMenu /> : null}
        {activeMenuItem === "Drinks" ? <DrinksMenu /> : null}
        {activeMenuItem === "Snacks" ? <SnacksMenu /> : null}
        {activeMenuItem === "Combo" ? <ComboMenu /> : null}
      </div>
    </>
  );
}
