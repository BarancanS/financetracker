import React, { useState, useEffect, useRef } from "react";
import { CurrencyState } from "../../CurrencyContext";

const SelectCurrency = () => {
  const {
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    inputValue,
    setInputValue,
    options,
  } = CurrencyState();
  const [storedCurrency, setStoredCurrency] = useState("EUR");
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]); // Initialize with an empty array
  const selectRef = useRef(null);

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency && currencies[storedCurrency]) {
      setSelectedCurrency(storedCurrency);
      setStoredCurrency(storedCurrency);
      setSearchInput(storedCurrency);
      setInputValue(storedCurrency); // Set inputValue to storedCurrency
    }
  }, [currencies, setSelectedCurrency]);

  useEffect(() => {
    const closeOptionsOnOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeOptionsOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeOptionsOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Filter options based on inputValue whenever it changes
    const filtered = options.filter((option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedOption) => {
    const newCurrency = selectedOption.value;
    setSelectedCurrency(newCurrency);
    setStoredCurrency(newCurrency);
    setInputValue(newCurrency);
    setSearchInput(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setInputValue(inputValue);
    setSearchInput(inputValue);

    const matchingOption = options.find(
      (option) => option.value.toLowerCase() === inputValue.toLowerCase()
    );

    if (matchingOption) {
      setSelectedCurrency(matchingOption.value);
      localStorage.setItem("selectedCurrency", matchingOption.value);
    }
  };

  const handleInputClick = () => {
    setInputValue("");
  };

  const inputClass = () => {
    if (inputValue === "") {
      return "bg-red-600";
    } else if (
      filteredOptions.some(
        (option) => option.value.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      return "bg-green-500";
    } else {
      return "bg-red-600";
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        ref={selectRef}
        className={`px-4 py-2 w-20 h-6 border rounded-lg focus:outline-none focus:border-blue-500 ${inputClass()}`}
        onClick={handleInputClick}
        onFocus={toggleDropdown}
      />
      {isOpen && (
        <ul className="absolute -top-3 left-20 z-20 mt-1 w-28 h-60 overflow-y-scroll border rounded-lg border-gray-300 bg-black">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-stone-600 ${
                option.value === selectedCurrency ? "bg-stone-400" : ""
              }`}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectCurrency;
