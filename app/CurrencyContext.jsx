"use client";
import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import CurrenciesList from "./config/api";

const Currency = createContext();
const CurrencyContext = ({ children }) => {
  const [currencies, setCurrencies] = useState();
  const getApi = async () => {
    return fetch(
      `https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP&apikey=cnQzjVDhxL2K5kedT2O9A9SYhgCKr8yC`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(data.quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <Currency.Provider value={{ currencies, setCurrencies }}>
      {children}
    </Currency.Provider>
  );
};

export default CurrencyContext;
export const CurrencyState = () => {
  return useContext(Currency);
};
