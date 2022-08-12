// This file was created and maintained by Jefferson

import { React, useState } from "react";
import "./createUser.css";
import Topbar from "../../components/topbar/Topbar";
import { axiosInstance } from "../../config";

export default function CreateUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [team, setTeam] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    //e.preventDefault();
    if (username && password) {
      setSubmitted(true);
      setError(false);

      const data = {
        username: username,
        password: password,
        profilePicture: profilePicture || null,
        coverPicture: coverPicture || null,
        team: team,
        isAdmin: isAdmin,
        city: city,
        from: from,
      };

      axiosInstance.post("/users", data).then(() => {
        alert("Success!");
      });
    } else {
      setError(true);
      console.log("Failure!");
    }
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.value);
    setSubmitted(false);
  };

  const handleCoverPicture = (e) => {
    setCoverPicture(e.target.value);
    setSubmitted(false);
  };

  const handleTeam = (e) => {
    setTeam(e.target.value);
    setSubmitted(false);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handleFrom = (e) => {
    setFrom(e.target.value);
    setSubmitted(false);
  };

  const handleIsAdmin = (e) => {
    console.log(e);
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      <Topbar />
      <div className="form">
        <div>
          <h1>User Creation</h1>
        </div>

        <div className="messages"></div>
        <div
          className="success"
          style={{
            display: submitted ? "" : "none",
          }}
        >
          <h3>User {username} successfully registered!!</h3>
        </div>

        <div
          className="error"
          style={{
            display: error ? "" : "none",
          }}
        >
          <h3>Please enter all the fields</h3>
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">UserName</label>
          <input
            onChange={handleUserName}
            className="input"
            value={username}
            type="text"
          />

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />

          <label className="label">profilePicture</label>
          <input
            onChange={handleProfilePicture}
            className="input"
            type="file"
          />

          <label className="label">CoverPicture</label>
          <input onChange={handleCoverPicture} className="input" type="file" />

          <label className="label">Team</label>
          <input
            onChange={handleTeam}
            className="input"
            value={team}
            type="text"
          />

          <label className="label">Admin?</label>
          <input type="checkbox" checked={isAdmin} onChange={handleIsAdmin} />

          <label className="label">City</label>
          <input
            onChange={handleCity}
            className="input"
            value={city}
            type="text"
          />

          <label className="label">From</label>
          <input
            onChange={handleFrom}
            className="input"
            value={from}
            type="text"
          />

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
