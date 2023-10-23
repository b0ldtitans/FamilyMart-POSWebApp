import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import api from "../api";
import jwtDecode from "jwt-decode";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [modalData, setModalData] = useState([]);

  const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const cashierName= decodedToken.name;

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await api.get(`/transaction/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      setTransactions(data.data);
    };

    fetchTransaction();
  }, []);

  const TransactionModal = () => {
    return (
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Transaction Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {modalData.map((item) => {
              return (
                <div key={item["Product"].id}>
                  <p className="text-base leading-relaxed text-gray-500">
                    {item["Product"].name} x {item.quantity} -{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item["Product"].price)}
                  </p>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction #
            </th>
            <th scope="col" className="px-6 py-3">
              Sales
            </th>
            <th scope="col" className="px-6 py-3">
              Cashier
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr className="bg-white border-b" key={transaction.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {transaction.id}
                </th>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(transaction.totalPrice)}
                </td>
                <td className="px-6 py-4">{cashierName}</td>
                <td className="px-6 py-4">
                  <button
                    data-modal-target="defaultModal"
                    data-modal-toggle="defaultModal"
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => {
                      props.setOpenModal("default");
                      setModalData(transaction["TransactionItems"]);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TransactionModal />
    </div>
  );
}

export default TransactionList;
