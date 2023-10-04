"use client";
import { useState, useEffect } from "react";

const List = () => {
  return (
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
          <h4 className="text-2xl">No Match...</h4>
        </div>
      </div>
    </div>
  );
};

export default List;
