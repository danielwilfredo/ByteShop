import React from "react";

const InputText = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
        {placeholder}
      </label>
      <input
        type={type}
        name="name"
        value={value}
        onChange={onChange}
        className={className || "w-full px-3 py-2 border rounded"}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
export default InputText;
