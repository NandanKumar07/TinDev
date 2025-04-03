import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, bio, gender, age, photoUrl, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
