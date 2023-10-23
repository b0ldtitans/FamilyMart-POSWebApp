import React from "react";
import api from "../api.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadProfilePicture from "../components/UploadProfilePicture.jsx";
import jwt from "jwt-decode";

export default function UserSettings() {
  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password must be at least 8 characters, and include 1 uppercase letter, 1 number, and 1 symbol"
      )
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm new password is required"),
    email: Yup.string().email("Invalid email address"),
    username: Yup.string(),
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwt(token);
  const { email, username, name } = decodedToken;

  const onSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.patch(
        "/user/updatesettings",
        {
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.alert("Profile settings updated!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile settings:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <section className="flex flex-col items-center justify-center w-[45%] rounded-md min-h-screen bg-white">
      <div className="bg-white p-8 rounded-md shadow-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">User Settings</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={email}
              className=" bg-gray-100 text-gray-500 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
              disabled
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={username}
              disabled
              className="w-full px-3 py-2 rounded-md border bg-gray-100 text-gray-500 border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-600 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={name}
              disabled
              className="w-full px-3 py-2 rounded-md border bg-gray-100 text-gray-500 border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-600 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-600 text-sm">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div className="text-red-600 text-sm">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>

          <UploadProfilePicture />

          <button
            type="submit"
            className="w-full bg-[#01AB52] text-white font-medium text-lg py-2 rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
