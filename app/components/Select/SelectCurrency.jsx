import React, { useState, useEffect, useRef } from "react";
import { CurrencyState } from "../../CurrencyContext";

const CustomSelect = () => {
  const { currencies, selectedCurrency, setSelectedCurrency } = CurrencyState();
  const [storedCurrency, setStoredCurrency] = useState("EUR");
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState(searchInput); // Controlled input value
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
    }
    // Initialize filteredOptions with all available options
    setFilteredOptions(options);
  }, [currencies, setSelectedCurrency, options]);

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
    const inputValue = e.target.value;
    setInputValue(inputValue); // Update the controlled input value
    setSearchInput(inputValue);

    if (inputValue === "") {
      // Reset filteredOptions to contain all options when input is cleared
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleInputClick = () => {
    // Clear the input value when clicked
    setInputValue("");
  };
  const inputClass = () => {
    if (inputValue === "") {
      return "bg-red-600";
    } else if (
      filteredOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
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
        <ul className="absolute top-0 left-20 z-20 mt-1 w-28 h-60 overflow-y-scroll border rounded-lg border-gray-300 bg-black">
          {filteredOptions.map((option, index) => (
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
