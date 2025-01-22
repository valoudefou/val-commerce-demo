// SuccessPage.jsx
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Login Successful!
        </h2>
        <p className="text-center mt-4 text-gray-600">
          Welcome to your dashboard
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
