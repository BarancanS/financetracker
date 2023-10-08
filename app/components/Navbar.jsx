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
        <ul className="flex flex-row items-center justify-center gap-4">
          <li className="text-[#FFD700]">
            Balance:{totalResult.toString().substring(0, 6)}{" "}
          </li>
        </ul>
      </ul>
    </section>
  );
};

export default Navbar;
