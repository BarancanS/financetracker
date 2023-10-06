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
  const [currencies, setCurrencies] = useState([]);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();

  const totalIncome = storageData.reduce((sum, item) => {
    if (item.genres.includes("Income")) {
      const currencyRate = currencies[item.currency] || 1; // Use a default rate of 1 if currency is not found
      return sum + (selectedCurrency * item.amount) / currencyRate;
    }
    return sum;
  }, 0);

  const totalExpense = storageData.reduce((sum, item) => {
    if (item.genres.includes("Expense")) {
      return sum + (selectedCurrency * item.amount) / currencies[item.currency];
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
    setSelectedCurrency([currencies["USDAED"]]);
  }, [currencies]);

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
