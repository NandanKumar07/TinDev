import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { removeUser } from "../utils/userSlice"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const requests = useSelector((store) => store.requests);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const pendingRequestCount = requests?.length || 0;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      dispatch(removeUser())
      return navigate("/login")
    } catch (err) {
      navigate("/error", {
        state: {
          error: {
            message: err.response?.data?.message || "An unexpected error occurred",
            code: err.response?.status || 500,
          },
        },
      })
    }
  }


  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-3xl group-hover:animate-pulse">💕</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              TinDev
            </span>
          </Link>

          {/* Navigation Links - Only show when user is logged in */}
          {user && (
            <div className="ml-5 hidden md:flex items-center space-x-6">
              <Link
                to="/feed"
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Discover</span>
              </Link>

              <Link
                to="/connections"
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Connections</span>
              </Link>

              <Link
                to="/requests"
                className="flex items-center space-x-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span>Requests</span>
                {/* Optional: Add notification badge */}
                {pendingRequestCount > 0 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></div>}
              </Link>
            </div>
          )}

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search connections..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2 px-4 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-gray-700 font-medium">Hey, {user.firstName}! 👋</span>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-2xl p-2 transition-all duration-300 border border-gray-200"
                >
                  <img
                    src={user?.photoUrl || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-400"
                  />
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    to="/feed"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 md:hidden"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Discover
                  </Link>

                  <Link
                    to="/connections"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 md:hidden"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Connections
                  </Link>

                  <Link
                    to="/requests"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 md:hidden"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    Requests
                  </Link>

                  <hr className="my-2 border-gray-200" />

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                    <span className="ml-auto bg-gradient-to-r from-rose-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </Link>

                  <hr className="my-2 border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
