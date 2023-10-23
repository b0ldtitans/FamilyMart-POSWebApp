import { useEffect, useState } from "react"
import { default as api } from "../api"
import Cookies from "js-cookie"

export function TransactionSaleItem({data}){
  const [showProducts, setShowProducts] = useState(false)

  function toggleShowProducts() {
    setShowProducts(!showProducts)
  }
  return (<div className="border border-gray-400 rounded-[2px] p-[1px]">
    {`${data.id} `}
      <span className="text-xl font-bold cols">
        {`${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.totalPrice)} `}
      </span>
      Created at{" "}
      <span className="text-gray-700">
        {data.transactionDate}
      </span> 
      {" "}by{" "}
      <span className="text-gray-700">
        {data.User.name}
      </span>
      <br/>
      <button 
        className="items-center px-1 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 sm:cols-span-2"
        onClick={toggleShowProducts}
      >
        {`${showProducts ? "Hide" : "Show"} Bought Products`}
      </button>
      { showProducts
        ?
        <>
          <hr/>
          <div className="grid gap-1.5 sm:grid-cols-2 m-[1px] p-[1px]">
            {data.TransactionItems.map((item) => (
              <ProductSaleInTransaction data={item} key={item.id}/>
            ))}
          </div> 
        </>
        : <></>
      }
  </div>)
}

export function ProductSaleInTransaction({data}){
  return(<div className="border border-gray-400 rounded-[2px]">
    <span className="text-gray-700">
     {`${data.Product.name} `}
    </span>
    <span className="text-lg font-bold cols">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.Product.price)}
    </span>
    <div>
      Amount : 
      <span className="text-gray-700">
        {` ${data.quantity}`}
      </span>
    </div>
  </div>)
}
/*
export function ProductSale({data}){
  return(<div>
    {`${data.name} `}
    <span className="text-xl font-bold cols">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.price)}
    </span>
    <div>
      // Bisa diadd ke query di backendnya sih, tapi males OMEGALUL
    {`Total Sold: ${
      data.TransactionItemData.reduce((accum, transactionItem) => {
        return accum + transactionItem.quantity
      }, 0)
    }`}
    </div>
  </div>)
}
*/

export default function SalesMenu(){
  const [transactions, setTransactions] = useState([])
  //const [products, setProducts] = useState([])
  //const [currentPage, setCurrentPage] = useState(1)
  //const [itemsPerPage] = useState(10)
  //const [cashiers, setCashiers] = useState([]) // Gunakan backend querying
  
  useEffect(() => {
    api
      .get(
        "/transaction/all",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          }
        }
      ).then((res) => {
        // Cukup ambil data yang sudah disortir di sisi backendnya
        setTransactions(res.data.data)
      })
      .catch((err) => {
        window.alert("Failed to get transaction data");
        console.log(err)
      })
  }, [])



  return (<>
  <section>
    Sales Report
    <hr/>
    <div className="grid gap-1.5 sm:grid-cols-2 p-[1px]">
      {transactions.map((item) => (
        <TransactionSaleItem data={item} key={item.id}/>
      ))}
    </div>
  </section>
  </>)
}