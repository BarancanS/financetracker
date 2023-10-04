import React from "react";
import SignIn from "./SignIn";
const Navbar = () => {
  return (
    <div className="w-full h-16 flex justify-between px-8 items-center bg-blue-700  ">
      <h4 className="text-blue-100 text-xl font-serif">Finance Tracker</h4>
      <div className="flex flex-row gap-4">
        <SignIn />
        <h4 className="text-green-200 text-lg font-mono">Balance: </h4>
      </div>
    </div>
  );
};

export default Navbar;
