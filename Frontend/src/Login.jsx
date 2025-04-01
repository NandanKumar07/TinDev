import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = axios.post("http://localhost:7777/login", {
        emailId,
        password,
      }, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex item-center justify-center py-40">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login Page</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
