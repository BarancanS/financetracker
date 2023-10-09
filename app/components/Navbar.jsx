"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CurrencyState } from "../CurrencyContext";
const Navbar = () => {
  const {
    currencies,
    storageData,
    setStorageData,
    totalResult,
    totalIncome,
    totalExpense,
    selectedCurrency,
    setSelectedCurrency,
  } = CurrencyState();
  return (
    <section className="w-10/12 h-16 flex flex-row items-center justify-between mx-auto">
      <Link
        href="/"
        className="text-[#FFD700] font-extrabold text-2xl max-md:text-base"
      >
        Finance Tracker
      </Link>
      <ul className="flex flex-row gap-4">
        <ul>
          <li className="text-[#FFD700] flex flex-row max-md:flex-col items-center justify-center">
            Balance:
            <span className="text-white">
              {totalResult.toString()}
              {selectedCurrency}
            </span>
          </li>
        </ul>
      </ul>
    </section>
  );
};

export default Navbar;
