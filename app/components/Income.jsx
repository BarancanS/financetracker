import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { CurrencyState } from "../CurrencyContext";
import SelectCurrency from "./Select/SelectCurrency";

const Income = () => {
  const { StorageData, setStorageData, selectedCurrency, inputValue, options } =
    CurrencyState();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [explanation, setExplanation] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // If there is data and inputValue matches any option value
    setIsValid(options.some((option) => option.value === inputValue));
  }, [inputValue, options]);

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  // Function to retrieve data from local storage

  const handleSubmit = (e) => {
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

    // Create a new item with the form data
    const newItem = {
      genres: "Income",
      amount: parseFloat(amount),
      currency: selectedCurrency,
      explanation,
      date: formattedDate,
    };

    // Retrieve the existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("storageData")) || [];

    // Update the data array with the new item
    const updatedData = [...existingData, newItem];

    // Store the updated data in local storage
    localStorage.setItem("storageData", JSON.stringify(updatedData));

    // Close the form modal
    setOpen(false);

    // Set a 1-second delay before opening the success modal
    setTimeout(() => {
      setSuccessModalOpen(true);
    }, 500);

    // Clear form inputs
    setAmount("");
    setExplanation("");

    // Update the state with the new data
    setStorageData(updatedData);
  };

  return (
    <main>
      <button
        onClick={() => setOpen(true)}
        className="w-24 max-md:w-20 py-2 bg-green-600 text-gray-100 rounded-xl hover:bg-green-400"
      >
        Income
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="inline-block bg-gray-900 w-11/12 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
          <h3 className="text-lg font-medium leading-6 text-gray-100 text-center mt-4">
            Income
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
                  placeholder="Money Amount"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="selectedCurrency"
                  className="text-gray-200 text-xl"
                >
                  Currency Type
                </label>
                <br />
                <div className="flex justify-center mt-2">
                  <SelectCurrency />
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
                  placeholder="Detail"
                />
              </div>
              <div className="flex justify-center items-center my-6">
                <button
                  type="submit"
                  className="bg-opacity-50 bg-blue-600 text-gray-100 rounded-xl px-4 py-2"
                  disabled={!isValid}
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
          <div className="bg-blue-950 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Success!</h2>
            <p>You have added your income successfully.</p>
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

export default Income;
