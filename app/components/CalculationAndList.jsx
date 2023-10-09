// Calculation.js
"use client";
import React, { useState, useEffect } from "react";
import Income from "./Income";
import Expense from "./Expense";
import { CurrencyState } from "../CurrencyContext";
import EditLocalStorageButton from "./EditLocalStorageButton";
import EditLocalData from "./EditLocalData";
import Carousel from "./Header/Carousel";
import SelectCurrency from "../components/Select/SelectCurrency";
import SelectFilterCurrency from "../components/Select/SelectFilterCurrency";
import SelectGenres from "./Select/SelectGenres";
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
    filterCurrency,
    setFilterCurrency,
    filterGenres,
    setFilterGenres,
  } = CurrencyState();

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
      filterCurrency === "" || item.currency?.includes(filterCurrency);

    // Return true only if both filters pass
    return passesGenresFilter && passesCurrencyFilter;
  });

  function clearFilter() {
    setFilterGenres("");
    setFilterCurrency("");
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] h-12 w-full flex flex-col">
      <div
        className="w-full mx-auto flex flex-col justify-start items-center bg-center bg-cover max-md:h-[55rem] h-[30rem] py-4"
        style={{
          backgroundImage: `url(/headerbanner.jpg)`,
        }}
      >
        <p className="text-6xl font-bold mt-10 text-center text-white">
          Finance Tracker
        </p>
        <p className="text-gray-400 font-light mt-5 text-center">
          Get All The Info Regarding Your Favorite currency
        </p>
        <Carousel />
        <div className="flex flex-col items-center justify-center mt-4">
          <div>
            <div className="flex flex-row text-left font-mono">
              <div className="text-[#FFD700]">Base Currency:</div>
              <div className="flex items-center justify-center">
                <SelectCurrency />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="text-left  text-gray-100 font-mono">
                <span className="text-[#FFD700]">Total Incomes:</span>
                {totalIncome.toString().substring(0, 6)}
                {selectedCurrency}
              </p>
            </div>
            <div>
              <p className="text-left text-gray-100 font-mono">
                <span className="text-[#FFD700]">Total Expenses:</span>
                {totalExpense.toString().substring(0, 6)}
                {selectedCurrency}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 justify-center md:ml-4 py-4">
          <Income />
          <Expense />
        </div>
      </div>
      <div className="m-0 w-full max-md:h-[calc(100vh-13.625rem)] min-h-[42.7rem]  ">
        <div className="flex  w-full max-md:justify-center justify-end mt-4 pr-2 ">
          <div className="mr-4 py-2 flex flex-row items-center justify-center">
            Filters:
            <SelectGenres />
            <SelectFilterCurrency />
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
          <div
            className="max-sm:w-11/12 w-[40rem]"
            style={{ wordBreak: "break-word" }}
          >
            {filteredItems.length === 0 ? (
              <div>
                <p className="text-2xl text-center">No match...</p>
              </div>
            ) : (
              filteredItems.map((items, index) => {
                let bgColor;
                let textColor;
                if (items.genres.includes("Expense")) {
                  bgColor = "bg-red-500";
                  textColor = "text-zinc-300";
                } else {
                  bgColor = "bg-[#FFD700]";
                  textColor = "text-zinc-600";
                }
                return (
                  <div
                    key={index}
                    className={`${bgColor} text-zinc-800 p-4 rounded-xl my-4 flex justify-between font-semibold`}
                  >
                    <div>
                      <div className="flex flex-row max-[300px]:flex-col gap-2">
                        <p>Type:{items.genres}</p>
                        <p>Amount:{items.amount}</p>
                      </div>
                      <div className="flex flex-row max-[300px]:flex-col gap-2">
                        <p>{items.currency}</p>
                        <p>Explanation:{items.explanation}</p>
                      </div>

                      <div className={`${textColor}`}>{items.date}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <EditLocalStorageButton
                        dataToEdit={items}
                        onEdit={handleEditLocalData}
                      />
                      <div
                        className="m-1 text-2xl cursor-pointer"
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
              })
            )}
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
