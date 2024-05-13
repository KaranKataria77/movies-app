import React from "react";
import "./style.css";

const Loader = ({ additionalStyle }: { additionalStyle: any }) => {
  return (
    <div style={additionalStyle} className="animated-background">
      <div className="background-masker"></div>
    </div>
  );
};

export default Loader;
