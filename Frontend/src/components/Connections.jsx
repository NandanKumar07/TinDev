import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      // TODO
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-2xl font-semibold text-gray-400">
          No Connections Found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-12 tracking-wide">
        Your Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={index}
              className="bg-base-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700"
            >
              <div className="flex flex-col items-center">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
                  alt={`${firstName} ${lastName}`}
                  className="w-32 h-32 object-cover rounded-full border-4 border-primary mb-4 shadow-md"
                />
                <h2 className="text-xl font-bold text-white mb-1">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-400">
                  {age ? `Age: ${age}` : ""}{" "}
                  {gender && gender !== "Not mentioned" ? `• ${gender}` : ""}
                </p>
                {about && (
                  <p className="text-center text-sm text-gray-500 mt-3 italic">
                    "{about}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
