import { useLocation, useNavigate } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || {
    message: "An unexpected error occurred.",
    code: 500,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600">Error {error.code}</h1>
        <p className="mt-4 text-gray-700 text-lg">{error.message}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;