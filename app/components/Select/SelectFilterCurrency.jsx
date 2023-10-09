import React, { useState, useEffect } from "react";
import Select from "react-select";
import { CurrencyState } from "../../CurrencyContext";

const SelectCurrency = () => {
  const {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    filterCurrency,
    setFilterCurrency,
  } = CurrencyState();

  const options = Object.keys(currencies).map((currency, index) => ({
    value: currency,
    label: currency,
  }));

  // Custom styles for options
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007BFF" : "#FFFFFF", // Change background color when selected
      color: state.isSelected ? "#FFFFFF" : "#000000", // Change text color when selected
    }),
  };

  return (
    <div className="mr-4 w-24">
      <Select
        value={options.find((option) => option.value === filterCurrency)}
        onChange={(selectedOption) => setFilterCurrency(selectedOption.value)}
        options={options}
        styles={customStyles} // Apply custom styles to options
        defaultValue={filterCurrency}
        id="selectbox"
        instanceId="selectbox"
      />
    </div>
  );
};

export default SelectCurrency;
