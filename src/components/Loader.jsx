import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader border-t-4 border-gray-500 rounded-full w-16 h-16 animate-spin"></div>
      <style jsx>{`
        .loader {
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-left-color: #222831;
        }
      `}</style>
    </div>
  );
};

export default Loader;