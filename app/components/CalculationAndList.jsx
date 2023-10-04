"use client";
import React, { useState, useEffect, useRef } from "react";
import { CurrencyState } from "../CurrencyContext";

const Calculation = () => {
  const { currencies, setCurrencies } = CurrencyState();
  console.log(currencies);
  //   const ref = useRef(text1);
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full flex flex-col md:flex-row">
      <div className="md:min-h-[calc(100vh-4rem)] flex flex-col justify-between m-0 w-full md:h-auto md:w-1/4 bg-gray-900">
        <div>
          <div className="flex justify-around my-4">
            <button className="w-auto  px-4 py-2 bg-green-500 text-gray-100 rounded-xl hover:bg-green-400">
              Income
            </button>
            <button className="w-auto  px-4 py-2 bg-red-500 text-gray-100 rounded-xl hover:bg-red-400">
              Expense
            </button>
          </div>
          <div>
            <h4 className="text-white text-center font-mono">
              Base Currency:
              <span>
                <select
                  name="currencies"
                  className="text-center bg-red-600 text-white w-16 cursor-pointer select-all"
                  // onChange={handleSelect}
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
            <h4 className="text-2xl">No Match...</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calculation;
