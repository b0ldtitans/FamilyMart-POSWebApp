import React, { useState } from "react";

const TransactionSidebar = ({ cart, onCheckout, onSplitBill, onDelete }) => {
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  //   const calculateSubtotal = () => {
  //     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  //   };

  //   const subtotal = calculateSubtotal();
  //   const grandTotal = subtotal - discount + tax;

  return (
    <div className="transaction-sidebar h-full bg-white rounded-xl shadow-md mx-3 p-5">
      <h2>Transaction</h2>
      <ul>
        {/* {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} x
            <input
              type="number"
              value={item.quantity}
              //   onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
          </li> */}
        {/* ))} */}
      </ul>
      <div>
        <p>Subtotal: </p>
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tax"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
        />
        <p>Grand Total: </p>
      </div>
      <div>
        <button onClick={onCheckout}>Checkout</button>
        <button onClick={onSplitBill}>Split Bill</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TransactionSidebar;
