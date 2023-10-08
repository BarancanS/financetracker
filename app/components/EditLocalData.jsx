// EditLocalData.js
import React, { useState } from "react";
import Modal from "./Modal";
import { CurrencyState } from "../CurrencyContext";

const EditLocalData = ({ dataToEdit, onSave, onCancel }) => {
  const { currencies, setCurrencies, StorageData } = CurrencyState();
  const [editedData, setEditedData] = useState({ ...dataToEdit });

  const handleAmountChange = (e) => {
    setEditedData({ ...editedData, amount: parseFloat(e.target.value) });
  };

  const handleExplanationChange = (e) => {
    setEditedData({ ...editedData, explanation: e.target.value });
  };

  const handleCurrencyChange = (e) => {
    setEditedData({ ...editedData, currency: e.target.value });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <Modal open={true} onClose={onCancel}>
      <div className="inline-block bg-gray-900 w-11/12 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl">
        <h3 className="text-lg font-medium leading-6 text-gray-100 text-center mt-4">
          Edit Income
        </h3>
        <div className="mt-2 flex w-full justify-center">
          <form onSubmit={handleSave}>
            <div className="mt-4">
              <label htmlFor="amount" className="text-gray-200 text-xl">
                Amount
              </label>
              <br />
              <input
                type="number"
                id="amount"
                className="p-2 my-2 placeholder-yellow-100 bg-gray-500 text-xl text-yellow-200 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-blue-700 smooth-transition-2"
                onChange={handleAmountChange}
                value={editedData.amount}
                required
                placeholder="Money Amount"
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
                  onChange={handleCurrencyChange}
                  value={editedData.currency}
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
                onChange={handleExplanationChange}
                value={editedData.explanation}
                required
                placeholder="Detail"
              />
            </div>
            <div className="flex justify-center items-center my-6">
              <button
                type="button"
                onClick={handleSave}
                className="bg-opacity-50 bg-blue-600 text-gray-100 rounded-xl px-4 py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditLocalData;
