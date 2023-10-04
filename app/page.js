"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import CalculationAndList from "./components/CalculationAndList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../shared/firebase";
import SignIn from "./components/SignIn";
export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return user ? (
    <main className="min-h-screen">
      <Navbar />
      <CalculationAndList />
    </main>
  ) : (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <SignIn />
    </div>
  );
}
