import React from "react";

const InputNumber = ({
  value,
  name,
  onChange,
  placeholder,
  className = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {placeholder || name}
      </label>
      <input
        type="number"
        name={name}
        placeholder={placeholder}
        value={value}
        min={0}
        max={100}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
};
export default InputNumber;
