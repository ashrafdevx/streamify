import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm opacity-70">{subTitle}</p>
    </div>
  );
};

export default Title;
