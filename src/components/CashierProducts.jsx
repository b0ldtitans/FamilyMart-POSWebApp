import { useState, useEffect } from "react";
import { useFormik } from "formik";
import api from "../api";

function CashierProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const formik = useFormik({
    initialValues: {
      categoryId: 0,
      name: "",
      sortType: "",
      sortAscend: "ASC",
    },
  });

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      const { data } = response;
      setCategories(data.data);
    };

    const fetchTotalPages = async () => {
      const response = await api.get("/products");
      const { data } = response;
      setTotalPage(Number(Math.ceil(data.data.length / 10)));
    };

    fetchCategories();
    fetchTotalPages();
  }, []);

  useEffect(() => {
    const fetchProductsWithoutCategory = async () => {
      const response = await api.get(
        `products/${currentPage}?nameFilter=${formik.values.name}&sortType=${formik.values.sortType}&sortAscend=${formik.values.sortAscend}`
      );
      const { data } = response;
      setProducts(data.data);
    };

    const fetchProducts = async () => {
      const response = await api.get(
        `/products/${currentPage}?category=${formik.values.categoryId}&nameFilter=${formik.values.name}&sortType=${formik.values.sortType}&sortAscend=${formik.values.sortAscend}`
      );
      const { data } = response;
      setProducts(data.data);
    };

    if (Number(formik.values.categoryId) !== 0) {
      fetchProducts();
    } else {
      fetchProductsWithoutCategory();
    }
  }, [
    formik.values.categoryId,
    formik.values.name,
    formik.values.sortType,
    formik.values.sortAscend,
    currentPage,
  ]);

  return (
    <>
      <div>
        <form>
          <p>By category</p>
          <select
            id="category"
            className="max-w-[256px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5"
            {...formik.getFieldProps("categoryId")}
          >
            <option value={0}></option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
          <label htmlFor="name">By name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="max-w-[256px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5"
            {...formik.getFieldProps("name")}
          />
          <label htmlFor="sortType">Sort by</label>
          <select
            id="category"
            className="max-w-[256px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5"
            {...formik.getFieldProps("sortType")}
          >
            <option value="createdAt"></option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <div>
            <div class="flex items-center mb-4">
              <input
                checked={formik.values.sortAscend === "ASC"}
                id="default-radio-1"
                type="radio"
                value="ASC"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                onChange={() => formik.setFieldValue("sortAscend", "ASC")}
              />
              <label
                for="default-radio-1"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Ascending
              </label>
            </div>
            <div class="flex items-center">
              <input
                checked={formik.values.sortAscend !== "ASC"}
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                onChange={() => formik.setFieldValue("sortAscend", "")}
              />
              <label
                for="default-radio-2"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Descending
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          return product.isActive ? (
            <div className="w-full max-w-[200px] m-3 p-3 bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center">
              <img
                className="justify-center items-center max-h-36"
                src={`http://localhost:8000/product-image/${product.image}`}
                alt="product"
              />

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <span className="text-xl font-semibold text-gray-900 my-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </span>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Page{" "}
          <span class="font-semibold text-gray-900">{currentPage + 1}</span> of{" "}
          <span class="font-semibold text-gray-900">{totalPage}</span>{" "}
        </span>

        <div class="inline-flex mt-2 xs:mt-0">
          <button
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <button
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CashierProducts;
