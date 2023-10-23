import React, { useState } from "react";
import FoodsMenu from "./FoodsMenu";
import DrinksMenu from "./DrinksMenu";
import SnacksMenu from "./SnacksMenu";
import ComboMenu from "./ComboMenu";

export default function GroceriesMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Drinks");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <>
      <div className="p-4 ">
        <div className=" mt-[10px] mb-[30px] flex flex-row items-start justify-start">
          <button
            onClick={() => handleMenuItemClick("SelfCare")}
            className={`mr-10 font-bold ${
              activeMenuItem === "SelfCare"
                ? "text-[#01ab52] underline mb-1"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Self Care
          </button>
          <button
            onClick={() => handleMenuItemClick("Household")}
            className={`mr-10 font-bold ${
              activeMenuItem === "Household"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Household
          </button>
          <button
            onClick={() => handleMenuItemClick("18plus")}
            className={`mr-10 font-bold ${
              activeMenuItem === "18plus"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            18+ Products
          </button>
          <button
            onClick={() => handleMenuItemClick("PetCare")}
            className={`mr-10 font-bold ${
              activeMenuItem === "PetCare"
                ? "text-[#01ab52] underline"
                : "text-gray-600"
            } focus:text-[#01ab52] focus:underline`}
          >
            Pet Care
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
