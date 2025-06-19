// src/components/common/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="
          border-4 border-gray-200 border-t-blue-500 rounded-full
          w-12 h-12 animate-spin
        "
      ></div>
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;