import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../api";
import { useSearchParams, Link } from "react-router-dom";
import { isEmptyArray, useFormik } from "formik";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";

// import Dashboard from "../components/Dashboard";

function ProductList() {
  const [pageSearch, setPageSearch] = useState(1);
  const [products, setProducts] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [availablePages, setAvailablePages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setAvailablePages(Math.max(Math.ceil(productAmount / 10), 1));
  }, [productAmount]);

  useEffect(() => {
    api
      .get(
        `/products/${
          isNaN(pageSearch) || pageSearch % 1 !== 0 ? 0 : pageSearch - 1
        }${searchParams.toString() ? "?" : ""}${searchParams.toString()}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setProductAmount(res.data.amount);
      })
      .catch((err) => {
        window.alert("Failed to load product data");
        console.log(err);
      });
  }, [pageSearch, searchParams]);

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
  }, [pageSearch, searchParams]);

  const searchSchema = yup.object().shape({
    nameFilter: yup.string(),
    category: yup.string(),
    sortType: yup.string(),
    sortAscend: yup.string()
  });
  const searchForm = useFormik({
    initialValues: {
      nameFilter: "",
      category: "",
      sortType: "",
      sortAscend: "",
    },
    validationSchema: searchSchema,
    onSubmit: (values) => {
      setPageSearch(1);
      const valCopy = new URLSearchParams(values);
      setSearchParams(valCopy);
    },
  });

  const pageSchema = yup.object().shape({
    to: yup.number().integer().min(1),
  });

  const pageForm = useFormik({
    initialValues: {
      to: pageSearch,
    },
    validationSchema: pageSchema,
    onSubmit: (values) => {
      const { to } = values;
      setPageSearch(to);
    },
  });
  function goToNextPage() {
    if (pageSearch < availablePages) {
      setPageSearch(pageSearch + 1);
    }
  }
  function goToPreviousPage() {
    if (pageSearch > 1) {
      setPageSearch(pageSearch - 1);
    }
  }

  async function toggleActiveById(id) {
    const productIndex = products.findIndex((product) => product.id === id)
    let { name, price, categoryId, description, isActive} = products[productIndex]
    isActive = !isActive
    try {
      const res = await api.put(
        `/products/${id}`,
        {
          name,
          price,
          categoryId,
          description,
          isActive
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      const productCopy = [...products]
      productCopy.splice(productIndex, 1, res.data.data)
      setProducts(productCopy)
      window.alert("Successfully edited product")
    } catch (err) {
      window.alert("Failed to edit product");
      console.log(err);
    }
  }

  return (
    // <Dashboard>
    <>
      <div className="pt-10 pb-2 px-4 mx-auto max-w-2xl lg:pt-16">
        <form onSubmit={searchForm.handleSubmit}>
          <div className="grid grid-cols-3 sm:grid-cols-2">
            <input
              type="text"
              name="nameFilter"
              placeholder="Product Name"
              className="m-0 py-px rounded-l-full col-span-2 sm:col-span-1 ring-2 ring-gray-100 ring-inset "
              {...searchForm.getFieldProps("nameFilter")}
            />
            <select
              className="m-0 py-px rounded-r-full ring-2 ring-gray-100 ring-inset "
              name="category"
              {...searchForm.getFieldProps("category")}
              defaultValue={searchParams.get("category")}
            >
              <option className="text-gray-300" value="any">
                Category...
              </option>
              {categories.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          Sort by{" "}
          {/*
          Date of creation 
          <input 
            type="radio" name="sortType" value="createdAt" onChange={() => searchForm.setFieldValue("sortType", "createdAt", true)}
          /> 
          */}
          Name{" "}
          <input 
            type="radio" 
            name="sortType" 
            value="name"
            onChange={() => searchForm.setFieldValue("sortType", "name", true)}
          />
          Price{" "}
          <input
            type="radio"
            name="sortType"
            value="price"
            onChange={() => searchForm.setFieldValue("sortType", "price", true)}
          />
          Descending{" "}
          <input
            type="radio"
            name="sortAscend"
            value="0"
            defaultChecked={true}
            onChange={() => searchForm.setFieldValue("sortAscend", "", true)}
          />
          Ascending{" "}
          <input
            type="radio"
            name="sortAscend"
            value="1"
            onChange={() => searchForm.setFieldValue("sortAscend", "1", true)}
          />
          <button
            className="items-center p-1 border-2 border-green-300 rounded-full hover:border-green-400 hover:bg-green-50"
            type="submit"
          >
            <BsSearch />
          </button>
        </form>
        <hr className="p-1" />
        {searchParams.get("category") &&
        categories.find(
          (cate) => cate.id === Number(searchParams.get("category"))
        ) ? (
          <div className="pl-1">
            {
              categories.find(
                (cate) => cate.id === Number(searchParams.get("category"))
              ).description
            }
          </div>
        ) : (
          <></>
        )}
        <section className="grid gap-1.5 sm:grid-cols-2">
          {isEmptyArray(products)
            ? "No items found."
            : /** Karena sudah disort, tinggal map saja hasil itemnya. */
              products.map((item) => (
                <div
                  className="grid gap-1.5 p-2 sm:grid-cols-2 border border-green-400 ring-2 ring-green-100 ring-inset rounded-lg"
                  key={item.id}
                >
                  <img
                    src={
                      item.image
                        ? `http://localhost:8000/product-image/${item.image}`
                        : ""
                    }
                    alt=""
                    className="col-span-2 mx-auto p-0.5 max-h-40"
                  />
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="text-xl font-bold cols">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </div>
                  <div>
                    <div className="grid gap-0.5 sm:grid-cols-2">
                      <div>
                        {categories.find((cate) => cate.id === item.categoryId)
                          ? categories.find(
                              (cate) => cate.id === item.categoryId
                            ).name
                          : ""}
                      </div>
                      <div className="text-gray-600">
                        {categories.find((cate) => cate.id === item.categoryId)
                          ? categories.find(
                              (cate) => cate.id === item.categoryId
                            ).description
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div>{item.description}</div>
                  <label>
                    Active:
                    <input
                      type="checkbox"
                      name={`activeId${item.id}`}
                      checked={item.isActive}
                      onChange={() => toggleActiveById(item.id)}
                    />
                  </label>

                  <Link to={`/admin/edit/${item.id}`}>
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              ))}
        </section>
      </div>
      <div>
        Page
        <button onClick={goToPreviousPage}>
          <BsArrowLeft />
        </button>
        {pageSearch}
        <button onClick={goToNextPage}>
          <BsArrowRight />
        </button>
        of {availablePages}
      </div>
      <form onSubmit={pageForm.handleSubmit}>
        <label>
          Go to:
          <input
            type="number"
            name="to"
            value={pageSearch}
            className="py-px rounded-full"
            min={1}
            max={availablePages}
            maxLength={Math.max(Math.floor(Math.log10(availablePages) + 1), 1)}
            size={Math.max(Math.floor(Math.log10(availablePages) + 2), 2)}
            {...pageForm.getFieldProps("to")}
          />
        </label>
      </form>
    </>
    // </Dashboard>)
  );
}

export default ProductList;
