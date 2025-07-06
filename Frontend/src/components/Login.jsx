"use client"

import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success") // success, error

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const clearForm = () => {
    setEmailId("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setAge("")
    setGender("")
    setError("")
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      )
      dispatch(addUser(res.data))
      showToastMessage("Welcome back! Login successful 🎉")
      setTimeout(() => {
        navigate("/feed")
      }, 1000)
    } catch (err) {
      const errorMessage = err?.response?.data || "Something went wrong!"
      setError(errorMessage)
      showToastMessage(errorMessage, "error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId,
          password,
          firstName,
          lastName,
          age,
          gender,
        },
        {
          withCredentials: true,
        },
      )
      dispatch(addUser(res.data))
      showToastMessage("Account created successfully! Please login to continue 🎉")

      // Clear form and switch to login
      setTimeout(() => {
        clearForm()
        setIsLoginForm(true)
      }, 1500)
    } catch (err) {
      const errorMessage = err?.response?.data || "Something went wrong!"
      setError(errorMessage)
      showToastMessage(errorMessage, "error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleForm = () => {
    clearForm()
    setIsLoginForm(!isLoginForm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center py-12 px-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${toastType === "success" ? "alert-success" : "alert-error"} shadow-lg border-0 rounded-2xl`}
            style={{
              backgroundColor: toastType === "success" ? "#f0fdf4" : "#fef2f2",
              borderColor: toastType === "success" ? "#bbf7d0" : "#fecaca",
              color: toastType === "success" ? "#166534" : "#dc2626",
            }}
          >
            <div className="flex items-center space-x-2">
              {toastType === "success" ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💕</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">
            {isLoginForm ? "Welcome Back" : "Join TinDev"}
          </h1>
          <p className="text-gray-600">
            {isLoginForm ? "Sign in to find your perfect match" : "Create your account to find Dev Partner"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Signup Specific Fields */}
            {!isLoginForm && (
              <>
                {/* First Name & Last Name */}
                <div className="flex gap-4">
                  <div className="w-1/2 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="flex gap-4">
                  <div className="w-1/2 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      min="18"
                      max="100"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Other</option>
                      <option value="Not Mentioned">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-400/50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLoginForm ? "Signing in..." : "Creating account..."}</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  {isLoginForm ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign In</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <span>Create Account</span>
                    </>
                  )}
                </span>
              )}
            </button>

            {/* Forgot Password - Only show on login */}
            {isLoginForm && (
              <div className="text-center">
                <a
                  href="#"
                  className="text-orange-500 hover:text-orange-600 text-sm transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Forgot your password?</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Form */}
        <div className="text-center mt-6">
          {isLoginForm ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 hover:underline"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>

        {/* Additional Info for Signup */}
        {!isLoginForm && (
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
