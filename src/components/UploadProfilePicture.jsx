import React from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api.js";
import { RiAddFill } from "react-icons/ri";

export default function UploadProfilePicture() {
  const formik = useFormik({
    initialValues: {
      name: "",
      profilePicture: null,
    },
    validationSchema: Yup.object({
      profilePicture: Yup.mixed()
        .test("fileSize", "File is too large", (value) => {
          return value && value.size <= 1024 * 1024;
        })
        .test("fileType", "Invalid file type", (value) => {
          return (
            value &&
            ["image/gif", "image/png", "image/jpeg"].includes(value.type)
          );
        }),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("profilePicture", values.profilePicture);
        console.log(values);
        const response = await api.post("/user/updateprofile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          window.alert("Profile picture updated!");
          window.location.reload();
        }
      } catch (error) {}
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("profilePicture", acceptedFiles[0]);
    },
  });

  const handleRemoveProfpic = async (Req, res) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete("/user/removeprofilepicture", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        window.alert("Profile picture removed!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <>
      <h1>Profile Picture</h1>
      <div
        {...getRootProps()}
        className="flex items-center justify-center bg-white"
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#01AB52] border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <RiAddFill className="h-[40px] w-[40px] text-white bg-[#01AB52]" />
            <p className="mt-5 text-sm text-gray-500 dark-text-gray-400">
              <span className="font-semibold text-[#01AB52]">Add Image</span>
            </p>
          </div>
          <input
            {...getInputProps()}
            id="dropzone-file"
            type="file"
            name="profilePicture"
            className="hidden"
            accept="image/"
            multiple={false}
          />
        </label>
      </div>

      {formik.errors.profilePicture && formik.touched.profilePicture && (
        <div className="text-red-500">{formik.errors.profilePicture}</div>
      )}
      <div className="justify-evenly flex ">
        <button
          type="button"
          onClick={() => {
            formik.handleSubmit();
          }}
          className=" bg-[#01AB52] mt-4 mb-11 text-white font-medium text-lg py-2 rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947] w-[25%]"
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => {
            handleRemoveProfpic();
          }}
          className=" bg-[#01AB52] mt-4 mb-11 text-white font-medium text-lg py-2 rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947] w-[25%]"
        >
          Remove
        </button>
      </div>
    </>
  );
}
