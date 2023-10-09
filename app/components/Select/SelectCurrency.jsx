import React, { useState, useEffect, useRef } from "react";
import { CurrencyState } from "../../CurrencyContext";

const CustomSelect = () => {
  const {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    inputValue,
    setInputValue,
  } = CurrencyState();
  const [storedCurrency, setStoredCurrency] = useState("EUR");
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(selectedCurrency); // Set initial value to selectedCurrency
  const selectRef = useRef(null);

  const options = Object.keys(currencies).map((currency, index) => ({
    value: currency,
    label: currency,
  }));

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency && currencies[storedCurrency]) {
      setSelectedCurrency(storedCurrency);
      setStoredCurrency(storedCurrency);
      setSearchInput(storedCurrency); // Set searchInput to storedCurrency when the component mounts
      setInputValue(storedCurrency); // Set inputValue to storedCurrency when the component mounts
    }
  }, [currencies, setSelectedCurrency]);

  useEffect(() => {
    // Add a click event listener to close the options when a click occurs outside of the select component
    const closeOptionsOnOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeOptionsOnOutsideClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", closeOptionsOnOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedOption) => {
    const newCurrency = selectedOption.value;
    setSelectedCurrency(newCurrency);
    setStoredCurrency(newCurrency);
    setInputValue(newCurrency); // Update inputValue with the selected option's value
    setSearchInput(selectedOption.label);
    localStorage.setItem("selectedCurrency", newCurrency);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convert input value to lowercase
    setInputValue(inputValue); // Update the controlled input value
    setSearchInput(inputValue);
    setIsOpen(true); // Open the dropdown when the user starts typing
  };

  return (
    <div className="relative" ref={selectRef}>
      <input
        type="text"
        value={inputValue} // Use the controlled input value
        onChange={handleInputChange}
        ref={selectRef} // Add a ref to the input element
        className="px-4 py-2 w-20 h-6 border rounded-lg focus:outline-none focus:border-blue-500"
        onClick={() => {
          setInputValue(""); // Clear the input value on click
          setIsOpen(true); // Open the dropdown when the user clicks inside the input
        }}
      />

      {isOpen && (
        <ul className="absolute -top-3 left-20 z-20 mt-1 w-28 h-60 overflow-y-scroll border rounded-lg border-gray-300 bg-black">
          {options
            .filter((option) => option.label.toUpperCase().includes(inputValue))
            .map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-stone-600 ${
                  option.value === selectedCurrency ? "bg-stone-400" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
