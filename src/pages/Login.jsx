import React, { useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

function Login() {
  document.title = "FamilyMart - Login";
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        const token = userData.data.token;

        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("token", token);

        if (userData.data.role === "admin") {
          navigate("/admin");
        } else if (userData.data.role === "cashier") {
          navigate("/cashier");
        }
      }
    } catch (error) {
      window.alert("Login failed!");
      console.error("Error:", error);
    }
  };
  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username can't be empty")
      .min(6, "Minimum characters is 6"),
    password: yup.string().required("Password can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      loginUser(username, password);
    },
  });

  const resetFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email can't be empty"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post("/auth/forgot-password", {
          email: values.email,
        });

        if (response.status === 200) {
          window.alert("Password reset email sent.");
        } else {
          window.alert("Failed to send password reset email.");
        }
      } catch (error) {
        console.error("Error in forgot password request:", error);
      }
    },
  });

  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);

  const openForgotPasswordModal = () => {
    setForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setForgotPasswordModalOpen(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
              alt=""
              className="h-[90px] w-[180px]"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex">
                <BsPersonCircle className="h-[30px] w-[30px] mr-10" />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in
                </h1>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      formik.touched.username && formik.errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Your username"
                    required
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500">{formik.errors.username}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="••••••••"
                    required
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-[#FAFAFA] bg-[#01AB52] hover:bg-[#01AB52] hover:bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={openForgotPasswordModal}
                  className=" font-medium rounded-lg text-sm ml-2 text-start  hover:text-black/70"
                >
                  Forgot Password?
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Forgot Password Modal */}
      {isForgotPasswordModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Forgot Password
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email to reset your password.
              </p>
              <form
                className="mt-6 space-y-4"
                onSubmit={resetFormik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      resetFormik.touched.email && resetFormik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Your email"
                    onChange={(e) =>
                      resetFormik.setFieldValue("email", e.target.value)
                    }
                    required
                    {...resetFormik.getFieldProps("email")}
                  />
                  {resetFormik.touched.email && resetFormik.errors.email && (
                    <div className="text-red-500">
                      {resetFormik.errors.email}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  // onClick={handleForgotPassword}
                  className="w-full text-[#FAFAFA] bg-[#01AB52] hover:bg-[#01AB52] hover:bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
                >
                  Reset Password
                </button>
              </form>
              <div className="mt-4">
                <button
                  onClick={closeForgotPasswordModal}
                  className="text-gray-500 hover:text-gray-900 underline text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
