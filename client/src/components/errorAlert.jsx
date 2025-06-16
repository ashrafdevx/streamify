import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    <>
      {error && (
        <div className="space-y-2">
          <div className="alert font-semibold alert-error">
            {error?.response?.data?.message}
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorAlert;
