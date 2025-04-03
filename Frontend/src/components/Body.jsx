import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      } else {
        navigate("/error", {
          state: {
            error: {
              message:
                err.response?.data?.message || "An unexpected error occurred",
              code: err.response?.status || 500,
            },
          },
        });
      }

      console.error(err);
    }
  };

  useEffect(() => {
    if(!userData) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
