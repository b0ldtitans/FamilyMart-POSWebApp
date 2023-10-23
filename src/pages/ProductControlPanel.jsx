import React, { useState } from "react";
import ProductByCategory from "./product-category-list";
import ProductList from "./product-list";
import CreateProduct from "./CreateProduct";
import CreateCategory from "./CreateCategory";

export default function CashierControlPanel({ onMenuItemClick }) {
  const [activeMenuItem, setActiveMenuItem] = useState("CashierList");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#01AB52] mb-4">
        Products Control Panel
      </h1>
      <div className=" mt-[10px] mb-[30px] flex flex-row items-start justify-start">
        <button
          onClick={() => handleMenuItemClick("GetAllProducts")}
          className={`mr-10 font-bold ${
            activeMenuItem === "GetAllProducts"
              ? "text-[#01ab52] underline mb-1"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          View All Products
        </button>
        <button
          onClick={() => handleMenuItemClick("ProductsByCategory")}
          className={`mr-10 font-bold ${
            activeMenuItem === "ProductsByCategory"
              ? "text-[#01ab52] underline"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          View Products by Category
        </button>
        <button
          onClick={() => handleMenuItemClick("AddNewProduct")}
          className={`mr-10 font-bold ${
            activeMenuItem === "AddNewProduct"
              ? "text-[#01ab52] underline"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          Add Product
        </button>
        <button
          onClick={() => handleMenuItemClick("AddNewCategory")}
          className={`mr-10 font-bold ${
            activeMenuItem === "AddNewCategory"
              ? "text-[#01ab52] underline"
              : "text-gray-600"
          } focus:text-[#01ab52] focus:underline`}
        >
          Add Category
        </button>
      </div>
      {activeMenuItem === "GetAllProducts" ? <ProductList /> : null}
      {activeMenuItem === "ProductsByCategory" ? <ProductByCategory /> : null}
      {activeMenuItem === "AddNewProduct" ? <CreateProduct /> : null}
      {activeMenuItem === "AddNewCategory" ? <CreateCategory /> : null}
    </div>
  );
}
