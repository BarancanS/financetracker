"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const Currency = createContext();
const CurrencyContext = ({ children }) => {
  const [currencies, setCurrencies] = useState({});
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("");
  const [filterGenres, setFilterGenres] = useState("");

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

  const retrieveDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("storageData")) || [];
    setStorageData(storedData);
  };

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    retrieveDataFromLocalStorage();
  }, []);
  useEffect(() => {
    setSelectedCurrency("");
  }, [currencies]);

  const getApi = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      "https://api.fastforex.io/fetch-all?api_key=2ce9ba66d7-3e08299ab4-s28d4p",
      options
    )
      .then((response) => response.json())
      .then((response) => setCurrencies(response.results))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getApi();
  }, []);
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
