import React from "react";

const TextField = ({ label, value, onChange }) => {
  return (
    <div className="form-control w-full space-y-2">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        className="input-bordered input w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
