// Title.jsx
import React from 'react';

const Title = ({ text, className = '' }) => {
  return (
    <h1 className={`text-4xl font-bold text-blue-700 mb-6 ${className}`}>
      {text}
    </h1>
  );
};

export default Title;
