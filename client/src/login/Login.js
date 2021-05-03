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
      <div className="pure-form" style={{ flexDirection: "column" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Login</h1>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="UserID..."
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            style={{ margin: "auto 8px" }}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ margin: "auto 8px" }}
          />
          <button
            className="pure-button pure-button-primary"
            onClick={login}
            style={{ margin: "auto 8px" }}
          >
            {" "}
            Login{" "}
          </button>
        </div>
        <div> {failMsg}</div>
      </div>
    </div>
  );
}
