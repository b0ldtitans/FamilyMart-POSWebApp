import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../api";
import { useFormik } from "formik";
import Cookies from "js-cookie";
// import Dashboard from "../components/Dashboard"
import { GiTrashCan } from "react-icons/gi";

function ProductCategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        window.alert("Failed to load category data");
        console.log(err);
      });
  }, []);

  const createCategorySchema = yup.object().shape({
    categoryName: yup
      .string()
      .required("Category name cannot be empty.")
      .min(3, "Category name must be at least 3 characters")
      .max(100, "Category name cannot be longer than 100 characters"),
    description: yup
      .string()
      .required("Category description cannot be empty.")
      .min(3, "Category description must be at least 3 characters")
      .max(100, "Category description cannot be longer than 100 characters"),
  });

  const createCategoryForm = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
    },
    validationSchema: createCategorySchema,
    onSubmit: (values) => {
      const { categoryName, description } = values;
      createNewCategory(categoryName, description);
    },
  });
  const createNewCategory = async (name, description) => {
    try {
      const res = await api.post(
        `/categories`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setCategories(categories.concat(res.data.data));
      window.alert("Successfully added category");
    } catch (err) {
      window.alert("Failed to add category");
      console.log(err);
    }
  };
  const editById = async (id, name, description) => {
    try {
      const res = await api.put(
        `/categories/${id}`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const cateIndex = categories.findIndex((item) => item.id === id);
      const cateCopy = [...categories];
      cateCopy.splice(cateIndex, 1, res.data.data);
      setCategories(cateCopy);
      window.alert("Successfully edited category");
    } catch (err) {
      window.alert("Failed to edit category");
      console.log(err);
    }
  };
  const deleteById = async (id) => {
    try {
      const res = await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setCategories(categories.filter((item) => item.id !== id));
      window.alert("Successfully deleted category");
    } catch (err) {
      window.alert("Failed to delete category");
      console.log(err);
    }
  };
  return (
    <>
      {/* <Dashboard> */}
      <section className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        {" "}
        <div>
          <h3>Categories</h3>
          <div className="grid gap-1.5 sm:grid-cols-3 sm:gap-2.5">
            {categories.map((item) => (
              <div
                className="grid gap-1.5 grid-cols-2 sm:grid-cols-6 sm:gap-2 border-x-2 border-y-2 rounded-lg border-gray-100"
                key={item.id}
              >
                <div className="text-center col-span-2 sm:text-right sm:col-span-3">
                  {item.name}
                </div>
                <div className="text-gray-600 text-center col-span-2 sm:text-left sm:col-span-3">
                  {item.description}
                </div>
                <button
                  className="items-center px-1 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:bg-gray-900 sm:col-span-4"
                  onClick={() =>
                    editById(
                      item.id,
                      createCategoryForm.values.categoryName,
                      createCategoryForm.values.description
                    )
                  }
                  disabled={
                    !(
                      createCategoryForm.isValid &&
                      (item.name !== createCategoryForm.values.categoryName ||
                        item.description !==
                          createCategoryForm.values.description) &&
                      createCategoryForm.dirty
                    )
                  }
                >
                  Replace
                </button>
                <button
                  className="items-center px-1 py-1 text-sm border-x-2 border-y-2 border-red-500 font-medium text-center rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-100 hover:border-red-700 sm:col-span-2"
                  onClick={() => deleteById(item.id)}
                >
                  <GiTrashCan className="fill-red-500 mx-auto" />
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={createCategoryForm.handleSubmit}>
            Submit product category data
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <label>
                Category name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                    createCategoryForm.touched.name &&
                    createCategoryForm.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  {...createCategoryForm.getFieldProps("categoryName")}
                />
                <div className="text-red-500">
                  {createCategoryForm.touched.name
                    ? createCategoryForm.errors.categoryName
                    : ""}
                </div>
              </label>
              <label>
                Category description:
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                    createCategoryForm.touched.description &&
                    createCategoryForm.errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                  {...createCategoryForm.getFieldProps("description")}
                />
                <div className="text-red-500">
                  {createCategoryForm.touched.description
                    ? createCategoryForm.errors.description
                    : ""}
                </div>
              </label>
            </div>
            <button
              className="w-full py-2 mt-6 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
              type="submit"
              disabled={
                !(createCategoryForm.isValid && createCategoryForm.dirty)
              }
            >
              Create New
            </button>
          </form>
        </div>{" "}
      </section>
      {/* </Dashboard> */}
    </>
  );
}

export default ProductCategoryList;
