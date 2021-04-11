import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Redirect } from "react-router";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import Navi from "../common/Navi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const { loading, userData } = useLoginValidate();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(false);
        setFailMsg(response.data.message);
      } else {
        setLoginStatus(true);
      }
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  if (userData.username || loginStatus) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <Navi>
      </Navi>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}> Login </button>
      <div> {failMsg}</div>
    </div>
  );
}
