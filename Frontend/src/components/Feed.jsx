import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import UserCard from "./UserCard"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getFeed = async () => {
    if (feed?.users?.length > 0) return
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (err) {
      navigate("/error", {
        state: {
          error: {
            message: err.response?.data?.message || "An unexpected error occurred",
            code: err.response?.status || 500,
          },
        },
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    )
  }

  const currentUser = feed?.users?.[currentIndex]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        {currentUser ? (
          <UserCard user={currentUser} onAction={handleNext} />
        ) : (
          <div className="text-center text-gray-600 text-xl font-semibold">
            No more matches 🥲
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed
