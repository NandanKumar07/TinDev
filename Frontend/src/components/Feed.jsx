import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
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
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (<div className="flex items-center justify-center py-[10%]">
      <UserCard user = {feed[0]}/>
    </div>)
  );
};

export default Feed;
