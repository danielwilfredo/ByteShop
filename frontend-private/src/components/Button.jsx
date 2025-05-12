import React from "react";

const Button = ({ label, actionButton }) => {
  return (
    <button
      className="m-1 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
      onClick={actionButton}
    >
      {label}
    </button>
  );
};
export default Button;
