// src/components/common/Input.tsx
import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default Input;