import React from "react";

const LeftImageCol = () => {
  return (
    <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
      <div className="max-w-md p-8">
        {/* Illustration */}
        <div className="relative aspect-square max-w-sm mx-auto">
          <img
            src="/i.png"
            alt="Language connection illustration"
            className="w-full h-full"
          />
        </div>

        <div className="text-center space-y-3 mt-6">
          <h2 className="text-xl font-semibold">
            Connect with language partners worldwide
          </h2>
          <p className="opacity-70">
            Practice conversations, make friends, and improve your language
            skills together
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftImageCol;
