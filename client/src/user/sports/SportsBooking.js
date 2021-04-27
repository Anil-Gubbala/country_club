import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

export default function SportsBooking(props) {
  axios.defaults.withCredentials = true;
  const [exception, setException] = useState(false);
  const [userID, setuserID] = useState(0);
  const [sportID, setsportID] = useState(0);
  const [tsID, settsID] = useState(0);
  const [bookingMode, setBookingMode] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [bookingSuccess, SetBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "s_name", headerName: "Sport Time", width: 200 },
    { field: "start_time", headerName: "Start Time", width: 200 },
    { field: "end_time", headerName: "End Time", width: 200 },
    { field: "venue_id", headerName: "Venue", width: 200 },
  ];
  const [rowData, setRowData] = useState({});

 const handleBooking = () => { 
    axios.post("http://localhost:3001/user/sportsBookingInsert")
        .then((result) => {
          SetBookingSuccess(true);
        })
        .catch((err) => {});
 };

    useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/user/getBookingSlot")
      .then((response) => {
        setRows(response.data);
        setBookingMode(false);
        SetBookingSuccess(false);
        setLoading(false);
        
      })
      .catch((err) => {
        setException(true);
        setLoading(false);
      });
    });
 
  if (bookingMode) {
    return (
      <div>
        <FormControl>
          <TextField
            id="sports-name"
            label="Sports Name"
            value={sportID}
            error={invalid}
            onChange={(e) => {
              setsportID(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            error={invalid}
            id="private-event-capacity"
            label="Start Time"
            type="number"
            onChange={(e) => settsID(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button  style= {{margin:"6px",display:"block",marginLeft:"auto"}}
            variant="contained"
            onClick={() => {
              setBookingMode(false);
            }}
          >
            Go back
          </Button>
        </FormControl>
        <FormControl>
          <Button  style= {{margin:"6px",display:"block",marginLeft:"auto"}}
          variant="contained" 
          color="primary" onClick={handleBooking}>
            Book
          </Button>
        </FormControl>
      </div>
    );
  }
  if (exception) {
    return <Alert severity="error">Invalid request : server side error</Alert>;
  }
  
  return (
    <div className="width100">
      <div style={{ height: 400, width: "100%" }}>
      <DataGrid
            rows={rows}
            columns={columns}
            pageSize={3}
            loading={loading}
            autoHeight = "true"
            getRowId={(row) => row.sport_id}
            onRowSelected = {(rowData)=> {
            console.log(rowData);
            }}
        />
        <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
            variant="contained"
            color="primary"
            disabled={!(rowData && rowData.isSelected)}
            onClick = {()=>{
            setBookingMode(true);
            }}
            >
            Book Slot
        </Button>
        </div>
    </div>
  );
}