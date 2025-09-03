import React from "react";

const Spinner = ({ size = "w-10 h-10", color = "border-blue-500" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${size} ${color}`}
    />
  );
};

export default Spinner;
