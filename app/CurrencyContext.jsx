"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../shared/firebase";
import { query, collection, where } from "firebase/firestore";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import React from "react";
import CurrenciesList from "../app/config/api";

const Currency = createContext();
const CurrencyContext = ({ children }) => {
  const [currencies, setCurrencies] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const retrieveDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("incomeData")) || [];
    setIncomeData(storedData);
  };

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    retrieveDataFromLocalStorage();
  }, []);
  useEffect(() => {
    if (user && user.uid) {
      const fetchData = async () => {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", user.uid));

        const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setList(data.List);
            setName(data.name);
          }
        });

        return () => unsubscribe();
      };

      fetchData();
    }
  }, [user]);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  const fetchData = useCallback(async () => {
    if (!user || !user.uid) {
      return; // Return early if user is not available
    }

    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setList(data.List);
        setName(data.name);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    fetchData(); // Call the fetchData function unconditionally
  }, [fetchData]);
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
        incomeData,
        setIncomeData,
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
