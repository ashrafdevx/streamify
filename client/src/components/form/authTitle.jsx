import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col">
        <h2 className="font-semibold">{title}</h2>
        <h2 className="text-sm opacity-70">{subTitle}</h2>
      </div>{" "}
    </div>
  );
};

export default Title;
