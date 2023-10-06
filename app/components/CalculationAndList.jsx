// Calculation.js
"use client";
import React, { useState, useEffect } from "react";
import Income from "./Income";
import Expense from "./Expense";
import { CurrencyState } from "../CurrencyContext";
import EditLocalStorageButton from "./EditLocalStorageButton";
import EditLocalData from "./EditLocalData";

const Calculation = () => {
  const {
    currencies,
    storageData,
    totalResult,
    setStorageData,
    totalIncome,
    totalExpense,
    selectedCurrency,
    setSelectedCurrency,
  } = CurrencyState();
  const [filterGenres, setFilterGenres] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("");
  const [editStorageData, setEditStorageData] = useState(null);

  const handleDeleteItem = (index) => {
    const updatedData = [...storageData];
    updatedData.splice(index, 1);
    setStorageData(updatedData);
    localStorage.setItem("storageData", JSON.stringify(updatedData));
  };

  const handleEditLocalData = (dataToEdit) => {
    setEditStorageData(dataToEdit);
  };

  const handleEditLocalStorage = (editedData) => {
    const updatedData = storageData.map((item) => {
      if (item === editStorageData) {
        return editedData;
      }
      return item;
    });

    localStorage.setItem("storageData", JSON.stringify(updatedData));
    setStorageData(updatedData);
    setEditStorageData(null);
  };

  const filteredItems = storageData.filter((item) => {
    // Filter based on genres
    const passesGenresFilter =
      filterGenres === "" || item.genres.includes(filterGenres);

    // Filter based on currency
    const passesCurrencyFilter =
      filterCurrency === "" || item.currency.includes(filterCurrency);

    // Return true only if both filters pass
    return passesGenresFilter && passesCurrencyFilter;
  });

  function clearFilter() {
    setFilterGenres("");
    setFilterCurrency("");
  }
  console.log(filterCurrency);
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full flex flex-col md:flex-row">
      <div className="md:min-h-[calc(100vh-4rem)] flex flex-col justify-between m-0 w-full md:h-auto md:w-1/4 bg-gray-900">
        <div>
          <div className="flex justify-around my-4">
            <Income />
            <Expense />
          </div>
          <div>
            <h4 className="text-white text-center font-mono">
              Base Currency:
              <span>
                <select
                  name="currencies"
                  className="text-center bg-red-600 text-white w-16 cursor-pointer select-all"
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  value={selectedCurrency}
                >
                  {Object.keys(currencies).map((currency, index) => {
                    return (
                      <option key={index} value={currencies[currency]}>
                        {currency.substring(3, 6)}
                      </option>
                    );
                  })}
                </select>
              </span>
            </h4>
          </div>
          <div className="flex flex-wrap justify-around items-center my-4">
            <div>
              <p className="text-center text-gray-100 font-mono">
                Total Incomes: {totalIncome}
              </p>
            </div>
            <div>
              <p className="text-center text-gray-100 font-mono">
                Total Expenses: {totalExpense}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-100 text-center mb-4 font-serif cursor-default hidden md:block">
            Finance Tracker
          </h4>
        </div>
      </div>
      <div className="m-0 w-full max-md:h-[calc(100vh-13.625rem)] md:w-3/4 bg-[#DBEAFE]">
        <div className="flex w-full justify-end mt-4 pr-2 md:pr-8">
          <div className="mr-4 py-2 flex flex-row items-center justify-center">
            Filters:
            <div className="mr-4">
              <select
                name=""
                id=""
                className="py-2"
                onChange={(e) => setFilterGenres(e.target.value)}
              >
                <option value="">None</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="mr-4">
              <select
                name="currencies"
                className="py-2"
                onChange={(e) => setFilterCurrency(e.target.value)}
                value={filterCurrency} // Use value instead of defaultValue
              >
                {Object.keys(currencies).map((currency, index) => {
                  return (
                    <option key={index} value={currency}>
                      {currency.substring(3, 6)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mr-4">
              <button
                className="bg-red-600 rounded-lg px-4 py-2 text-gray-100 hover:bg-red-500"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-4">
          <div>
            {filteredItems.map((items, index) => {
              let bgColor;
              if (items.genres.includes("Expense")) {
                bgColor = "bg-[#FECACA]";
              } else {
                bgColor = "bg-[#A7F3D0]";
              }
              return (
                <div
                  key={index}
                  className={`${bgColor} text-gray-900 p-4 rounded-xl my-4 flex justify-between max-w-[80vh] w-[500px]`}
                >
                  <div>
                    <div className="flex flex-row gap-2">
                      <h1>Type:{items.genres}</h1>
                      <h1>Amount:{items.amount}</h1>
                      <h1>{items.currency?.substring(3, 6)}</h1>
                      <h1>Explanation:{items.explanation}</h1>
                    </div>
                    <div className="opacity-50">{items.date}</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <EditLocalStorageButton
                      dataToEdit={items}
                      onEdit={handleEditLocalData}
                    />
                    <div
                      className="m-1 text-lg cursor-pointer"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {editStorageData && (
        <EditLocalData
          dataToEdit={editStorageData}
          onSave={handleEditLocalStorage}
          onCancel={() => setEditStorageData(null)}
        />
      )}
    </main>
  );
};

export default Calculation;
