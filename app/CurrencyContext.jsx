"use client";
import { createContext, useState, useEffect, useContext } from "react";

const Currency = createContext();

const CurrencyContext = ({ children }) => {
  const [currencies, setCurrencies] = useState({});
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default to "EUR"
  const [filterCurrency, setFilterCurrency] = useState("");
  const [filterGenres, setFilterGenres] = useState("");
  const [inputValue, setInputValue] = useState(selectedCurrency);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalIncome = storageData.reduce((sum, item) => {
    if (item.genres.includes("Income")) {
      const currencyRate = currencies[item.currency] || 1; // Use a default rate of 1 if currency is not found
      return sum + (currencies[selectedCurrency] * item.amount) / currencyRate;
    }
    return sum;
  }, 0);

  const totalExpense = storageData.reduce((sum, item) => {
    if (item.genres.includes("Expense")) {
      return (
        sum +
        (currencies[selectedCurrency] * item.amount) / currencies[item.currency]
      );
    }
    return sum;
  }, 0);

  const totalResult = totalIncome - totalExpense;

  // Function to retrieve data from local storage
  const retrieveDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("storageData")) || [];
    setStorageData(storedData);
  };

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    retrieveDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const getApi = async () => {
      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };
        const response = await fetch(
          "https://api.fastforex.io/fetch-all?api_key=2ce9ba66d7-3e08299ab4-s28d4p",
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const data = await response.json();
        setCurrencies(data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getApi();
  }, []);

  // My select options of SelectCurrency
  const options = Object.keys(currencies).map((currency, index) => ({
    value: currency,
  }));

  return (
    <Currency.Provider
      value={{
        currencies,
        setCurrencies,
        list,
        setList,
        storageData,
        setStorageData,
        totalResult,
        totalIncome,
        totalExpense,
        setSelectedCurrency,
        selectedCurrency,
        filterCurrency,
        setFilterCurrency,
        filterGenres,
        setFilterGenres,
        loading,
        error,
        inputValue,
        setInputValue,
        options,
      }}
    >
      {children}
    </Currency.Provider>
  );
};

export default CurrencyContext;

export const CurrencyState = () => {
  return useContext(Currency);
};
