import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navi from "../common/Navi";

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [registered, setRegisterd] = useState(false);
  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
        setRegisterd(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (registered) {
    return (
      <div className="main">
        <div> Successfully registered</div>
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
              setUsernameReg(e.target.value);
            }}
          />
        </div>
        <div className="margin8">
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="marginAuto" onClick={register}>
            {" "}
            Register{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
