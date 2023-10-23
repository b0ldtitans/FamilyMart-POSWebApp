import api from "../api";
import React, { useState, useEffect } from "react";

export default function CashierList() {
  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({
    username: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    api
      .get("/admin/cashiers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cashiers", error);
      });
  }, []);

  const fetchCashiers = () => {
    api
      .get("/admin/cashiers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cashiers", error);
      });
  };

  const handleCreateCashier = () => {
    api
      .post("/admin/new_cashier", newCashier, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers((prevCashiers) => [...prevCashiers, response.data.data]);
        setNewCashier({ username: "", password: "", name: "" });
      })
      .catch((error) => {
        console.error("Error creating cashier", error);
      });
  };

  const handleDeleteCashier = (username) => {
    api
      .delete(`/admin/delete_cashier/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCashiers((prevCashiers) =>
          prevCashiers.filter((cashier) => cashier.username !== username)
        );
      })
      .catch((error) => {
        console.error("Error deleting cashier", error);
      });
  };

  const handleToggleCashierStatus = (username, isActive) => {
    api
      .patch(`/admin/cashier_toggler/${username}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCashiers((prevCashiers) =>
          prevCashiers.map((cashier) =>
            cashier.username === username
              ? { ...cashier, isActive: !isActive }
              : cashier
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling cashier status", error);
      });
  };
  return (
    <>
      <table className="w-full p-5 border">
        <thead className="bg-white p-10">
          <tr className="border-[#01AB52] bg-white text-[#01AB52]">
            <th className="border px-4 py-2 w-1/4">Username</th>
            <th className="border px-4 py-2 w-1/4">Name</th>
            <th className="border px-4 py-2 w-1/4">Active</th>
            <th className="border px-4 py-2 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody className="border-[#01AB52] bg-white text-[#01AB52]">
          {cashiers.map((cashier) => (
            <tr key={cashier.username} className="text-center">
              <td className="border px-4 py-2 w-1/4 break-words">
                {cashier.username}
              </td>
              <td className="border px-4 py-2 w-1/4 break-words">
                {cashier.name}
              </td>
              <td
                className={`border px-4 py-2 w-1/4 break-words ${
                  cashier.isActive ? "text-[#01ab52]" : "text-red-500"
                }`}
              >
                {cashier.isActive ? "Active" : "Non-active"}
              </td>

              <td className="border px-4 py-2  flex flex-row">
                <button
                  className="bg-[#01AB52] hover:bg-opacity-80 text-white font-bold px-6 rounded-md mr-2"
                  onClick={() =>
                    handleToggleCashierStatus(
                      cashier.username,
                      cashier.isActive
                    )
                  }
                >
                  Toggle Status
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 rounded-md"
                  onClick={() => handleDeleteCashier(cashier.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="w-full py-2 mt-6 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
        onClick={fetchCashiers}
      >
        Refresh List
      </button>
    </>
  );
}
