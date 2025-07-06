import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/" + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
       dispatch(removeRequest(_id));
    } catch (err) {
      // TODO
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.receivedRequests));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-2xl font-semibold text-gray-400">
          No Connection Requests Found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center my-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-12 tracking-wide">
        Connection Requests ({requests.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

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

              <div className="mt-6 flex gap-4 justify-center">
                <button
                  className="btn btn-success px-6"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error px-6"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
