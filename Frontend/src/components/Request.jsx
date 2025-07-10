import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { addRequest, removeRequest } from "../utils/requestSlice"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Request = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [processingId, setProcessingId] = useState(null)

  const reviewRequest = async (status, _id) => {
    setProcessingId(_id)
    try {
      await axios.post(BASE_URL + "/" + "request/review/" + status + "/" + _id, {}, { withCredentials: true })
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error("Error reviewing request:", err)
    } finally {
      setProcessingId(null)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#ff6b6b", borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-700 text-lg font-medium">Loading requests...</p>
        </div>
      </div>
    )
  }

  if (!requests) return null

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">📭</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Connection Requests</h1>
          <p className="text-gray-600 text-lg">You're all caught up! Check back later for new requests.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Connection Requests
          </h1>
          <p className="text-gray-600 text-lg">
            {requests.length} {requests.length === 1 ? "person wants" : "people want"} to connect with you
          </p>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request, index) => {
            const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId
            const isProcessing = processingId === request._id

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photoUrl || "https://via.placeholder.com/300x400"}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  {/* Age Badge */}
                  {age && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-gray-700 font-semibold text-sm shadow-lg">
                      {age}
                    </div>
                  )}

                  {/* New Request Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full px-3 py-1 shadow-lg">
                    <span className="text-white text-xs font-semibold">New Request</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800">
                      {firstName} {lastName}
                    </h2>
                    {gender && gender !== "Not mentioned" && (
                      <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1 font-medium">
                        {gender}
                      </span>
                    )}
                  </div>

                  {about && <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">"{about}"</p>}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      disabled={isProcessing}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-gray-300/50 disabled:cursor-not-allowed disabled:transform-none border border-gray-200"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Reject
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-400/50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Accept
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Request
