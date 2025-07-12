import { useState } from "react"
import UserCard from "./UserCard"
import axios from "../utils/axios";
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [age, setAge] = useState(user?.age || 0)
  const [gender, setGender] = useState(user?.gender || "Not mentioned")
  const [about, setAbout] = useState(user?.about || "")
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch()

  const saveProfile = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.patch(
        `/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        }
      )
      dispatch(addUser(res?.data?.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 py-12 px-4">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-700 shadow-xl">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Profile updated successfully!</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Edit Your Profile
          </h1>
          <p className="text-gray-600 text-lg">Make yourself shine ✨</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Preview</h2>
              <UserCard user={{ firstName, lastName, gender, age, photoUrl, about }} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Update Information</h2>

              <div className="space-y-6">
                {/* First Name & Last Name */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your age"
                      min="18"
                      max="100"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-gray-700 font-medium text-sm">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="Not mentioned">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Other</option>
                    </select>
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium text-sm">Photo URL</label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your photo URL"
                  />
                </div>

                {/* About Me */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium text-sm">About Me</label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm">{error}</div>
                )}

                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-400/50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
