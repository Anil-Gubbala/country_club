import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navi from "../common/Navi";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Registration() {
  Axios.defaults.withCredentials = true;
  const [registered, setRegisterd] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState({
    // user_id: false,
    password: false,
    first_name: false,
    last_name: false,
    email_id: false,
    zip_code: false,
    street: false,
    city: false,
  });
  const defaultValues = {
    // user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    email_id: "",
    zip_code: "",
    street: "",
    city: "",
    member_type: 0,
  };
  const [userDetails, setUserDetails] = useState(defaultValues);
  

  const register = () => {
    if (
      // userDetails.user_id.trim().length < 5 ||
      userDetails.password.trim().length < 5 ||
      userDetails.first_name.trim() === "" ||
      userDetails.last_name.trim() === "" ||
      userDetails.city.trim() === "" ||
      userDetails.street.trim() === "" ||
      userDetails.email_id.trim() === "" ||
      userDetails.zip_code.length < 6
    ) {
      setMessage("Input failed to match some requirements");
    } else if (
      // userDetails.user_id.includes(" ") ||
      userDetails.email_id.includes(" ") ||
      userDetails.zip_code.includes(" ") ||
      userDetails.password.includes(" ")
    ) {
      setMessage(
        "Space character not allowed in zip_code, password, email_id"
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
        {/* <FormControl>
          <TextField
            helperText="5-10 characters"
            id="register-user-id"
            label="User ID"
            type="text"
            error={invalid.user_id}
            onChange={(e) => {
              const validation =
                e.target.value.length < 5 ||
                e.target.value.length > 25 ||
                e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, user_id: validation });
              setUserDetails({ ...userDetails, user_id: e.target.value });
            }}
          />
        </FormControl> */}
        
        <FormControl>
          <TextField
            helperText={invalid.first_name ? "1-25 characters" : ""}
            id="register-first-name"
            label="First Name"
            type="text"
            error={invalid.first_name}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, first_name: validation });
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
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, last_name: validation });
              setUserDetails({ ...userDetails, last_name: e.target.value });
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
              const validation =
                e.target.value.length < 5 ||
                e.target.value.length > 25 ||
                e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, password: validation });
              setUserDetails({ ...userDetails, password: e.target.value });
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
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, email_id: validation });
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
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, street: validation });
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
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, city: validation });
              setUserDetails({ ...userDetails, city: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            helperText="6 digit zip code"
            id="register-zip-code"
            label="ZIP Code"
            type="number"
            error={invalid.zip_code}
            onChange={(e) => {
              const validation =
                e.target.value.length !== 6 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, zip_code: validation });
              setUserDetails({ ...userDetails, zip_code: e.target.value });
            }}
          />
        </FormControl>
        <FormControl>
          {/* {<InputLabel htmlFor="register-member-type">Select MemberShip Type</InputLabel>} */}
          <Select
            id="register-member-type"
            value={userDetails.member_type}
            onChange={(e) => {
              setUserDetails({ ...userDetails, member_type: e.target.value });
            }}
            defaultValue={0}
            inputProps={{ "aria-label": "Without label" }}
          >
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
