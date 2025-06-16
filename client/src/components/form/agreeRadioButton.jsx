import React from "react";

const AgreeTerms = (handleRadioChecke, registerUser) => {
  return (
    <div className="form-control w-full space-y-2 space-x-2">
      <input
        type="checkbox"
        // onChange={handleRadioChecke}
        className="checkbox checkbox-bordered"
        // value={registerUser?.agree}
      />
      <label className="label">
        <span className="label-text">
          i agree to the <span className="text-primary"> term of service</span>{" "}
          and
          <span className="text-primary"> privacy policy </span>
        </span>
      </label>
    </div>
  );
};

export default AgreeTerms;
