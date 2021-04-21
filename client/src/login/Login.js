import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Redirect, useParams } from "react-router";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import Navi from "../common/Navi";

export default function Login() {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const { loading, userData } = useLoginValidate();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      user_id: user_id,
      password: password,
    })
      .then((response) => {
        setLoginStatus(true);
      })
      .catch((error) => {
        setLoginStatus(false);
        setFailMsg(error.response.data.err);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  if (userData.user_id || loginStatus) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <Navi></Navi>
      <div className="pure-form">
        <h1 style={{textAlign:"center"}}>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="pure-button pure-button-primary" onClick={login}> Login </button>
        <div> {failMsg}</div>
      </div>
      
    </div>
  );
}
