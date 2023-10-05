"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../../shared/firebase";
import { query, collection, where } from "firebase/firestore";
import { CurrencyState } from "../CurrencyContext";
import Income from "./Income";
import Expense from "./Expense";
const Calculation = () => {
  const { currencies, setCurrencies } = CurrencyState();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(true);

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

            const fetchDataForItems = async () => {
              const itemsData = [];

              for (const items of data.List) {
                try {
                  const response = await fetch(profileSingleCoin(items.id));
                  const itemData = await response.json();
                  itemsData.push(itemData);
                } catch (error) {
                  console.error(error);
                }
              }
            };

            fetchDataForItems();
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

  // let asd = (currencies["USDEUR"] * 10) / currencies["USDAUD"];
  // let dsa = (currencies["USDEUR"] * 20) / currencies["USDAUD"];
  // let qwe = asd + dsa;
  // console.log(qwe);
  //   const ref = useRef(text1);
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full flex flex-col md:flex-row">
      <div className="md:min-h-[calc(100vh-4rem)] flex flex-col justify-between m-0 w-full md:h-auto md:w-1/4 bg-gray-900">
        <div>
          <div className="flex justify-around my-4">
            {/* <button className="w-auto  px-4 py-2 bg-green-500 text-gray-100 rounded-xl hover:bg-green-400">
              Income
            </button> */}
            <Income />
            {/* <button className="w-auto  px-4 py-2 bg-red-500 text-gray-100 rounded-xl hover:bg-red-400">
              Expense
            </button> */}
            <Expense />
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
            {list.map((items, index) => {
              let bgColor;
              if (items.genres.includes("Expense")) {
                bgColor = "bg-[#A7F3D0]";
              } else {
                bgColor = "bg-[#FECACA]";
              }
              return (
                <div
                  key={index}
                  className={`${bgColor} text-gray-900 p-4 rounded-xl my-4 flex justify-between max-w-[80vh] w-[500px]`}
                >
                  <div>
                    <div>
                      <div>Type:{items.genres}</div>
                    </div>
                    <div className="opacity-50">{items.date}</div>
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
