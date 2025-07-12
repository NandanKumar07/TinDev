import { useEffect } from "react"
import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from "../utils/axios";
import { addUser } from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    console.log("Trying to fetch user...")
    try {
      const res = await axios.get(`/profile/view`)
      console.log("User fetched:", res.data)
      dispatch(addUser(res.data))
    } catch (err) {
      console.error("Fetch user failed:", err.response?.status, err.response?.data)

      if (err.response?.status === 401) {
        navigate("/login")
      } else {
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
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <Navbar />
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
