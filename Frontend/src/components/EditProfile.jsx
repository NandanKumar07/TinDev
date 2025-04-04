import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || 0);
  const [gender, setGender] = useState(user?.gender || "Not mentioned");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
        {showToast && <div className="toast toast-top toast-center ">
            <div className="alert alert-success">
                <span>
                    Profile Saved Successfullly.
                </span>
            </div>
        </div>}
      <div className="flex item-center justify-center gap-[25%] py-20">
        <div>
          <UserCard
            user={{ firstName, lastName, gender, age, photoUrl, about }}
          />
        </div>
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
              />
              <legend className="fieldset-legend">photo URL : </legend>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input"
              />
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
              />
              <legend className="fieldset-legend">about</legend>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input"
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
