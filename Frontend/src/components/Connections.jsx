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

      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error cases;
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return <h1 className="text-2xl font-semibold">No Connections Found.</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="text-3xl font-bold text-white mb-8">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform duration-300"
            >
              <img
                src={photoUrl || "https://via.placeholder.com/150"}
                alt={`${firstName} ${lastName}`}
                className="w-32 h-32 object-cover rounded-full border-4 border-white mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">
                {firstName} {lastName}
              </h2>
              {age && <p className="text-sm text-gray-300 mb-1">Age: {age}</p>}
              {gender && (
                <p className="text-sm text-gray-300 mb-1 capitalize">
                  Gender: {gender}
                </p>
              )}
              {about && (
                <p className="text-center text-sm text-gray-400 mt-2 italic">
                  "{about}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
