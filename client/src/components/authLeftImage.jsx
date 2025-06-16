import React from "react";

const LeftImageCol = () => {
  return (
    <div className="hidden sm:w-1/2 lg:flex items-center justify-center">
      <div className="max-w-md">
        <div className="max-w-sm relative mx-auto aspect-square">
          <img
            src="./i.png"
            alt=""
            className="w-full h-full opacity-50 rounded-sm "
          />
        </div>
      </div>
    </div>
  );
};

export default LeftImageCol;
