import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navi from "../common/Navi";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  Axios.defaults.withCredentials = true;

  const register = () => {
    if (username.trim().length < 5 || password.trim().length < 5) {
      setMessage("username & password should be minimum of 5 digits");
    } else if (username.includes(" ")) {
      setMessage("Space character not allowed")
    } else {
      Axios.post("http://localhost:3001/register", {
        username: username,
        password: password,
      })
        .then((response) => {
          setMessage("Registration success");
          setRegisterd(true);
        })
        .catch((error) => {
          setMessage(error.response.data.err);
          setRegisterd(false);
        });
    }
  };

  if (registered) {
    return (
      <div className="main">
        <div> {message}</div>
        <Link to="/login">Go to Login Page</Link>
      </div>
    );
  }
  return (
    <div>
      <Navi></Navi>
      <div className="alignCenter">
        <h1>Registration</h1>
        <div className="margin8">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="margin8">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="marginAuto" onClick={register}>
            Register
          </button>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}
