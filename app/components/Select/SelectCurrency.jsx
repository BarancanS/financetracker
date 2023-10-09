import React, { useState, useEffect } from "react";
import Select from "react-select";
import { CurrencyState } from "../../CurrencyContext";

const SelectCurrency = () => {
  const { currencies, selectedCurrency, setSelectedCurrency } = CurrencyState();

  const options = Object.keys(currencies).map((currency, index) => ({
    value: currency,
    label: currency,
  }));

  // Ensure selectedCurrency is initialized with a default value
  useEffect(() => {
    if (!selectedCurrency && options.length > 0) {
      setSelectedCurrency(options[0].value); // Set the first currency as the default value
    }
  }, [options, selectedCurrency, setSelectedCurrency]);

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
        value={options.find((option) => option.value === selectedCurrency)}
        onChange={(selectedOption) => setSelectedCurrency(selectedOption.value)}
        options={options}
        styles={customStyles} // Apply custom styles to options
      />
    </div>
  );
};

export default SelectCurrency;
