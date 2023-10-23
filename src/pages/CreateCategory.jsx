import * as yup from "yup";
import { useFormik } from "formik";

import api from "../api";

function CreateCategory() {
  const token = localStorage.getItem("token");
  const createCategory = async (name, description) => {
    try {
      const response = await api.post(
        "/categories",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const categoryData = response.data;
      console.log(categoryData);
      window.alert("Create category success!");
    } catch (error) {
      window.alert("Creating category failed!");
      console.log("Error:", error);
    }
  };

  const categorySchema = yup.object().shape({
    name: yup
      .string()
      .required("Name cannot be empty")
      .min(3, "Minimum character is 3"),
    description: yup
      .string()
      .required("Description cannot be empty")
      .min(3, "Minimum character is 3"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      const { name, description } = values;
      createCategory(name, description);
    },
  });

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add new category
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
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
                placeholder="Category Name"
                required
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div class="sm:col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900"
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
                placeholder="Category Description"
                required
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500">{formik.errors.description}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
          >
            Add category
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateCategory;
