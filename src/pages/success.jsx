import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

export const SuccessPage = () => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Simulate fetching transaction details
    setTimeout(() => {
      // Logic to retrieve the transaction amount
      // For demonstration, let's say we're getting it from local storage
      const transactionAmount = localStorage.getItem('transactionAmount') || 0;
      setAmount(transactionAmount);
      setIsLoading(false); // Update loading state after fetching data
    }, 2000); // 2 seconds delay to simulate loading
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      {isLoading ? (
        // Loading indicator
        <div className="flex flex-col items-center justify-center">
        <div
          className="w-8 h-8 border-4 border-green-600 border-dotted rounded-full animate-spin"
          style={{ borderTopColor: 'transparent' }}
        ></div>
        <p className="text-lg text-green-600 mt-4">Processing your transaction...</p>
      </div>
      ) : (
        // Transaction success message
        <div className="text-center">
          <div className="mb-8">
            <svg className="mx-auto w-16 h-16 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-green-800">Transaction Successful!</h2>
          <p className="text-lg mb-4 text-green-700">Your transaction has been processed successfully.</p>
          <p className="text-md text-green-600">Amount Sent: <span className="font-semibold">₹{amount}</span></p>
          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/dashboard')}
          >
            Go Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};


