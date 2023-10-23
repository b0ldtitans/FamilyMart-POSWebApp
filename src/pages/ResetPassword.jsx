import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match");
      return;
    }

    try {
      const response = await api.patch(`/auth/reset-password/${token}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      const data = await response.data;

      if (response.status === 200) {
        window.alert("Password Successfully Changed");
      } else {
        window.alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error in resetPassword:", error);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white w-1/2 rounded-lg shadow-md p-5">
        <div className="">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
            alt="logo"
            className="cursor-pointer h-[70px] w-[160px] ml-[25px]"
          />
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleResetPassword}>
          <div className="w-full">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block max-w-full p-2.5"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block max-w-full p-2.5"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-[#FAFAFA] bg-[#01AB52] hover:bg-[#01AB52] hover-bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
          >
            Reset Password
          </button>
          {resetMessage && <div className="text-red-500">{resetMessage}</div>}
        </form>
      </div>
    </section>
  );
}
