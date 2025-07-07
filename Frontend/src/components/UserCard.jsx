import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserCard = ({ user, onAction }) => {
  const { _id, firstName, lastName, bio, gender, age, photoUrl, about } = user
  const [isLiked, setIsLiked] = useState(false)
  const [isIgnored, setIsIgnored] = useState(false)
  const dispatch = useDispatch();

  const handleLike = async () => {
    setIsLiked(true)
    try {
      await axios.post(`${BASE_URL}/request/send/interested/${_id}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(_id))
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsLiked(false)
        onAction() // move to next
      }, 500)
    }
  }

  const handleIgnore = async () => {
    setIsIgnored(true)
    try {
      await axios.post(`${BASE_URL}/request/send/ignored/${_id}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(_id))
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsIgnored(false)
        onAction() // move to next
      }, 500)
    }
  }

  return (
    <div
      className={`relative w-full max-w-sm mx-auto transform transition-all duration-500 ${isLiked ? "scale-105 rotate-2" : isIgnored ? "scale-95 -rotate-2" : "hover:scale-105"
        }`}
    >
      {/* Like/Ignore Overlays */}
      {isLiked && (
        <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl z-10 flex items-center justify-center backdrop-blur-sm">
          <div className="text-6xl animate-bounce">💚</div>
        </div>
      )}
      {isIgnored && (
        <div className="absolute inset-0 bg-red-500/20 rounded-3xl z-10 flex items-center justify-center backdrop-blur-sm">
          <div className="text-6xl animate-bounce">💔</div>
        </div>
      )}

      <div
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-coral-500/25 transition-all duration-300"
        style={{ boxShadow: "0 25px 50px -12px rgba(255, 107, 107, 0.15)" }}
      >
        {/* Image Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={photoUrl || "/placeholder.svg"}
            alt="profile"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

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
              Online
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-800">{`${firstName} ${lastName}`}</h2>
            {gender && (
              <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 font-medium">{gender}</span>
            )}
          </div>

          {about && <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{about}</p>}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleIgnore}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-gray-300/50 border border-gray-200"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Pass
              </span>
            </button>

            <button
              onClick={handleLike}
              className="flex-1 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-400/50"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Like
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
