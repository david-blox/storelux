import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner loader" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
