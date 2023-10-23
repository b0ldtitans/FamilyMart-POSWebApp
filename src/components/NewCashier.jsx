import api from "../api";
import { useState } from "react";

export default function CreateCashier() {
  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });
  const handleCreateCashier = () => {
    api
      .post("/admin/new_cashier", newCashier, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers((prevCashiers) => [...prevCashiers, response.data.data]);
        setNewCashier({ username: "", password: "", name: "", email: "" });
      })
      .catch((error) => {
        console.error("Error creating cashier", error);
      });
  };

  return (
    <>
      <div className="mb-6 p-1 rounded-md shadow-lg bg-[#01AB52]">
        <div className="bg-white p-10 rounded-md flex-col">
          <h2 className="text-lg font-semibold mb-2">Create New Cashier</h2>
          <div className="flex-col">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              required
              className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
              type="text"
              id="username"
              placeholder="Username"
              value={newCashier.username}
              onChange={(e) =>
                setNewCashier({ ...newCashier, username: e.target.value })
              }
            />

            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              required
              className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
              type="text"
              id="name"
              placeholder="Name"
              value={newCashier.name}
              onChange={(e) =>
                setNewCashier({ ...newCashier, name: e.target.value })
              }
            />

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              required
              className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
              type="text"
              id="email"
              placeholder="Email"
              value={newCashier.email}
              onChange={(e) =>
                setNewCashier({ ...newCashier, email: e.target.value })
              }
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              required
              className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
              type="password"
              id="password"
              placeholder="Password"
              value={newCashier.password}
              onChange={(e) =>
                setNewCashier({ ...newCashier, password: e.target.value })
              }
            />

            <button
              className="w-full py-2 mt-5 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
              onClick={handleCreateCashier}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
