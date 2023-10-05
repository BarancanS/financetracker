import React from "react";
const Navbar = () => {
  return (
    <div className="w-full h-16 flex justify-between px-8 items-center bg-blue-700">
      <div className="w-11/12 h-16 flex justify-between px-8 items-center mx-auto">
        <h4 className="text-blue-100 text-xl font-serif">Finance Tracker</h4>
        <div className="flex flex-row gap-4 items-center justify-center">
          <h4 className="text-green-200 text-lg font-mono">Balance: </h4>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
