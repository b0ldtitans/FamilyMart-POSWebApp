import React, { useState, useEffect } from "react";
import api from "../api";

function SalesReport() {
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  useEffect(() => {
    // Make an API request to fetch sales data
    api.get("/transaction/all").then((response) => {
      setSalesData(response.data);
    });
  }, []);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Sales Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.transactionDate}</td>
              <td>${sale.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={salesData.length}
        paginate={paginate}
      />
    </div>
  );
}

// Pagination component
function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SalesReport;
