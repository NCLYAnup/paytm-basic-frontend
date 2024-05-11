
export const ErrorMessage = ({ isVisible, closeHandler, message }) => {
    if (!isVisible) return null;
  
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline"> {message}</span>
        <button onClick={closeHandler} className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                     <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.196 7.349 14.849a1.2 1.2 0 11-1.697-1.697L8.196 10 5.652 7.349a1.2 1.2 0 111.697-1.697L10 8.804l2.651-3.152a1.2 1.2 0 111.697 1.697L11.804 10l2.544 2.651a1.2 1.2 0 010 1.698z" />
                    </svg>
        </button>
      </div>
    );
  };
  