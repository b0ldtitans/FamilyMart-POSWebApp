import { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../api";
import Cookies from "js-cookie";

function CreateProduct() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (
    name,
    price,
    categoryId,
    image,
    description
  ) => {
    console.log({
      name,
      price,
      categoryId,
      image,
      description,
    });

    try {
      const response = await api.post(
        "/products",
        {
          name,
          price,
          categoryId,
          image,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const productData = response.data;
      console.log(productData);
      window.alert("Adding product success!");
    } catch (error) {
      window.alert("Something went wrong:", error);
      console.log(error);
    }
  };

  const productSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name cannot be empty")
      .min(3, "Minimum length is 3"),
    price: yup
      .number()
      .positive("Price cannot be negative or zero")
      .required("Price cannot be empty"),
    categoryId: yup.number().integer(),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Invalid file type", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      })
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 1 * 1024 * 1024;
      }),
    description: yup
      .string()
      .required("Descrption cannot be empty")
      .min(3, "Minimum length is 3"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      categoryId: 1,
      image: null,
      description: "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      const { name, price, categoryId, image, description } = values;
      handleAddProduct(
        name,
        parseInt(price, 10),
        categoryId,
        image,
        description
      );
      resetForm({
        values: {
          name: "",
          price: 0,
          categoryId: 1,
          image: null,
          description: "",
        },
      });
      setUploadedImage(null);
    },
  });

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new product
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Type product name"
                required
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                step="1000"
                name="price"
                id="price"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Price"
                required
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500">{formik.errors.price}</div>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5"
                {...formik.getFieldProps("categoryId")}
              >
                {categories.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500">{formik.errors.category}</div>
              )}
            </div>
            <div className="sm:col-span-2 mb-6">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Upload Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadedImage !== null ? (
                      <img
                        src={uploadedImage}
                        alt="Selected"
                        className="w-10/12 sm:w-full max-h-52"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500">{formik.errors.image}</div>
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Description goes here"
              required
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateProduct;
