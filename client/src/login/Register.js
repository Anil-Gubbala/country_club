import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navi from "../common/Navi";
import { Button, FormControl, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Registration() {
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    user_id: false,
    password: false,
    first_name: false,
    last_name: false,
    email_id: false,
    zip_code: false,
    street: false,
    city: false,
  });
  const defaultValues = {
    user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    email_id: "",
    zip_code: "",
    street: "",
    city: "",
    member_type: ""
  };

  const [userDetails, setUserDetails] = useState(defaultValues);
  Axios.defaults.withCredentials = true;

  const register = () => {
    if (
      userDetails.user_id.trim().length < 5 ||
      userDetails.password.trim().length < 5 ||
      userDetails.first_name.trim() === "" ||
      userDetails.last_name.trim() === "" ||
      userDetails.city.trim() === "" ||
      userDetails.street.trim() === "" ||
      userDetails.email_id.trim() === "" ||
      userDetails.zip_code.length < 5
    ) {
      setMessage("Input failed to match some requirements");
    } else if (
      userDetails.user_id.includes(" ") ||
      userDetails.email_id.includes(" ") ||
      userDetails.zip_code.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      setMessage(
        "Space character not allowed in user_id, zip_code, password, email_id"
      );
    } else {
      Axios.post("http://localhost:3001/register", {
        userDetails,
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
        <h1 style={{ textAlign: "center" }}> {message}</h1>
        <Link to="/login" className="button-xlarge pure-button">
          Go to Login Page
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Navi></Navi>
      <FormGroup>
        <FormControl>
          <TextField
            helperText="5-10 characters"
            id="register-user-id"
            label="User ID"
            type="text"
            error={invalid.user_id}
            onChange={(e) => {
              invalid.user_id =
                e.target.value.length < 5 ||
                e.target.value.length > 25 ||
                e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, user_id: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText="Minimum 5 characters"
            id="register-password"
            label="Password"
            type="password"
            error={invalid.password}
            onChange={(e) => {
              invalid.password =
                e.target.value.length < 5 ||
                e.target.value.length > 25 ||
                e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText={invalid.first_name ? "1-25 characters" : ""}
            id="register-first-name"
            label="First Name"
            type="text"
            error={invalid.first_name}
            onChange={(e) => {
              invalid.first_name =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, first_name: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText={invalid.last_name ? "1-25 characters" : ""}
            id="register-last-name"
            label="Last Name"
            type="text"
            error={invalid.last_name}
            onChange={(e) => {
              invalid.last_name =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, last_name: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText={invalid.email_id ? "1-25 characters" : ""}
            id="register-email-id"
            label="Email ID"
            type="text"
            error={invalid.email_id}
            onChange={(e) => {
              invalid.eamil_id =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, email_id: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText={invalid.street ? "1-25 characters" : ""}
            id="register-street"
            label="Street"
            type="text"
            error={invalid.street}
            onChange={(e) => {
              invalid.street =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, street: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText={invalid.city ? "1-25 characters" : ""}
            id="register-city"
            label="City"
            type="text"
            error={invalid.city}
            onChange={(e) => {
              invalid.city =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, city: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText="5 digit zip code"
            id="register-zip-code"
            label="ZIP Code"
            type="number"
            error={invalid.zip_code}
            onChange={(e) => {
              invalid.zip_code =
                e.target.value.length !== 5 || e.target.value === ""
                  ? true
                  : false;
              setUserDetails({ ...userDetails, zip_code: e.target.value });
            }}
          />
        </FormControl>
        <FormControl >
        {/* {<InputLabel htmlFor="register-member-type">Select MemberShip Type</InputLabel>} */}
        <Select
          id="register-member-type"
          value={userDetails.member_type}
          onChange={(e) => {
            setUserDetails({ ...userDetails, member_type: e.target.value });
          }}
          defaultValue = {0}
          inputProps={{ 'aria-label': 'Without label' }}
        >u
          <MenuItem value={0}>Silver</MenuItem>
          <MenuItem value={1}>Gold</MenuItem>
          <MenuItem value={2}>Platinum</MenuItem>
        </Select>
        <FormHelperText>Select Membership Type</FormHelperText>
      </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={register}>
            Register
          </Button>
        </FormControl>
        {message && <Alert severity="error">{message}</Alert>}
      </FormGroup>
    </div>
  );
}
