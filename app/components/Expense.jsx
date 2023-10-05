import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { CurrencyState } from "../CurrencyContext";
import { auth } from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../shared/firebase";

const Expense = () => {
  const { currencies, setCurrencies } = CurrencyState();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [listCurrency, setListCurrency] = useState("");
  const [explanation, setExplanation] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [user, loading] = useAuthState(auth);

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      const fetchDocumentIdData = async () => {
        try {
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].id;
            setDocumentId(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchDocumentIdData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a Date object to get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    // Check if user is authenticated and has a documentId
    if (user && documentId) {
      const userId = documentId;
      const userDocRef = doc(db, "users", userId);

      try {
        // Get the user's document
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // Create a new List item with the form data and formatted date/time
        const newItem = {
          genres: "Expense",
          amount: parseFloat(amount),
          currency: listCurrency,
          explanation,
          date: formattedDate,
        };

        // Update the user's List in Firebase
        const updatedList = [...(userData.List || []), newItem];
        await updateDoc(userDocRef, { List: updatedList });

        // Close the form modal
        setOpen(false);

        // Set a 1-second delay before opening the success modal
        setTimeout(() => {
          setSuccessModalOpen(true);
        }, 500);

        // Clear form inputs
        setAmount("");
        setListCurrency("");
        setExplanation("");
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <main>
      <button
        onClick={() => setOpen(true)}
        className="w-auto px-4 py-2 bg-red-500 text-gray-100 rounded-xl hover:bg-red-400"
      >
        Expense
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="inline-block bg-gray-900 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
          <h3 className="text-lg font-medium leading-6 text-gray-100 text-center mt-4">
            Expense
          </h3>
          <div className="mt-2 flex w-full justify-center">
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="amount" className="text-gray-200 text-xl">
                  Amount
                </label>
                <br />
                <input
                  type="number"
                  id="amount"
                  className="p-2 my-2 placeholder-yellow-100 bg-gray-500 text-xl text-yellow-200 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-blue-700 smooth-transition-2"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="listCurrency" className="text-gray-200 text-xl">
                  Currency Type
                </label>
                <br />
                <div className="flex justify-center mt-2">
                  <select
                    id="listCurrency"
                    className="text-center bg-red-600 text-white w-16 cursor-pointer select-all"
                    onChange={(e) => setListCurrency(e.target.value)}
                    value={listCurrency}
                    required
                  >
                    {Object.keys(currencies).map((currency, index) => (
                      <option key={index} value={currency}>
                        {currency.substring(3, 6)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="explanation" className="text-gray-200 text-xl">
                  Explanation
                </label>
                <br />
                <input
                  type="text"
                  id="explanation"
                  className="p-2 my-2 placeholder-yellow-100 bg-gray-500 text-xl text-yellow-200 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-blue-700 smooth-transition-2"
                  onChange={(e) => setExplanation(e.target.value)}
                  value={explanation}
                  required
                />
              </div>
              <div className="flex justify-center items-center my-6">
                <button
                  type="submit"
                  className="bg-opacity-50 bg-blue-600 text-gray-100 rounded-xl px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Success!</h2>
            <p>You are added your expense successfully.</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
              onClick={handleSuccessModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Expense;
