import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Connections = () => {
  const connections = useSelector((store) => store.connection)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const fetchConnections = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      })
      dispatch(addConnections(res.data.data))
    } catch (err) {
      console.error("Error fetching connections:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#ff6b6b", borderTopColor: "transparent" }}
          ></div>
          <p className="text-gray-700 text-lg font-medium">Loading connections...</p>
        </div>
      </div>
    )
  }

  if (!connections) return null

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">💔</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Connections Yet</h1>
          <p className="text-gray-600 text-lg">Start swiping to make your first connection!</p>
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
            Your Connections
          </h1>
          <p className="text-gray-600 text-lg">
            {connections.length} amazing {connections.length === 1 ? "connection" : "connections"}
          </p>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {connections.map((connection, index) => {
            const { firstName, lastName, photoUrl, age, gender, about } = connection

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
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

                  {/* Online Status */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                      Connected
                    </span>
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

                  {about && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">"{about}"</p>}

                  {/* Message Button */}
                  <div className="mt-4">
                    <button className="w-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-400/50">
                      Send Message
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

export default Connections
