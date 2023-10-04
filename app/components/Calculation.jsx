"use client";
import React, { useState, useEffect, useRef } from "react";
import { CurrencyState } from "../CurrencyContext";

const Calculation = () => {
  const { currencies, setCurrencies } = CurrencyState();
  console.log(currencies);
  //   const ref = useRef(text1);
  return (
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
  );
};

export default Calculation;
