// LinearProgressBar.jsx
import React from 'react';

const LinearProgressBar = (progress) => {
  return (
<div className="w-full mt-4 h-2 bg-white rounded-lg overflow-hidden">
      <div
        className="h-full bg-blue rounded-lg transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LinearProgressBar;
