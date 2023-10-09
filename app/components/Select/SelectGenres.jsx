import React from "react";
import { CurrencyState } from "../../CurrencyContext";

const SelectGenres = () => {
  const { filterGenres, setFilterGenres } = CurrencyState();
  return (
    <div className="mr-4">
      <select
        name=""
        id=""
        className="py-2 rounded-lg"
        onChange={(e) => setFilterGenres(e.target.value)}
        value={filterGenres}
      >
        <option value="">None</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </div>
  );
};

export default SelectGenres;
