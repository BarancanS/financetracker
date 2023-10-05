"use client";
import React, { useState, useEffect } from "react";
import Income from "./Income";
import Expense from "./Expense";
import { CurrencyState } from "../CurrencyContext";

const Calculation = () => {
  const { currencies, setCurrencies, incomeData, setIncomeData } =
    CurrencyState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const localData = JSON.parse(localStorage.getItem("incomeData")) || [];
    setFilteredData(localData);
  }, [incomeData]);

  const handleDeleteItem = (index) => {
    const updatedData = [...filteredData];
    updatedData.splice(index, 1);
    setFilteredData(updatedData);

    // Update local storage with the modified data
    localStorage.setItem("incomeData", JSON.stringify(updatedData));
  };

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
                Total Incomes:{" "}
              </p>
            </div>
            <div>
              <p className="text-center text-gray-100 font-mono">
                Total Expenses:{" "}
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
              <select name="" id="" className="py-2">
                <option value="">None</option>
                <option value="">Income</option>
                <option value="">Expense</option>
              </select>
            </div>
            <div className="mr-4">
              <input
                type="text"
                className="text-center py-2 text-gray-900 w-16 cursor-pointer select-all"
              />
            </div>
            <div className="mr-4">
              <button className="bg-red-600 rounded-lg px-4 py-2 text-gray-100 hover:bg-red-500">
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-4">
          <div>
            {filteredData.map((items, index) => {
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
                    <div>
                      <div>Type: {items.genres}</div>
                    </div>
                    <div className="opacity-50">{items.date}</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="m-1 text-lg cursor-pointer">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                      </svg>
                    </div>
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
    </main>
  );
};

export default Calculation;
