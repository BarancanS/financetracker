// Modal.js
import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed z-10 inset-0 flex justify-center items-center duration-700 transition-colors ${
        open ? "visible bg-gray-900 bg-opacity-75" : "invisible"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
