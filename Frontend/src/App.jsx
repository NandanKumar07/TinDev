import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Error from "./components/error";
import Connections from "./components/Connections";
import Request from "./components/Request";

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element = {<Body/>}>
            <Route path="/feed" element = {<Feed/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/profile" element = {<Profile/>}/>
            <Route path="/connections" element = {<Connections/>}/>
            <Route path="/requests" element = {<Request/>}/>
          </Route>
          <Route path="/error" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
