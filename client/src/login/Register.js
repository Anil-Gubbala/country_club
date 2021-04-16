import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navi from "../common/Navi";

export default function Registration() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const defaultValues = {
    user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    email_id: "",
    zip_code: "",
    street: "",
    city: "",
  };
  const [userDetails, setUserDetails] = useState(defaultValues);
  Axios.defaults.withCredentials = true;

  const register = () => {
    if (userDetails.user_id.trim().length < 5 || userDetails.password.trim().length < 5) {
      setMessage("user_id & password should be minimum of 5 digits");
    } else if (userDetails.user_id.includes(" ")) {
      setMessage("Space character not allowed");
    } else {
      Axios.post("http://localhost:3001/register", {
        userDetails
      })
        .then((response) => {
          setMessage("Registration success. Contact admin for approval");
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
          <label>UserId</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,user_id:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setUserDetails({...userDetails,password:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,first_name:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,last_name:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,email_id:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>Street</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,street:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>City</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,city:e.target.value});
            }}
          />
        </div>
        <div className="margin8">
          <label>Zip Code</label>
          <input
            type="text"
            onChange={(e) => {
              setUserDetails({...userDetails,zip_code:e.target.value});
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
