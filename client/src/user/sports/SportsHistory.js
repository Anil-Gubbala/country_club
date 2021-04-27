import {} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';


export default function SportsHistory() {
      axios.defaults.withCredentials = true;
      const [rows, setRows] = useState([]);
      const [loading, setLoading] = useState(false);
      const [bookingMode, setBookingMode] = useState(false);
      const [bookingSuccess, SetBookingSuccess] = useState(false);

      const columns = [
      { field: "booking_id", headerName: "Booking ID" , width:200},
      { field: "s_name", headerName: "Sports Name",width:200 },
      { field: "booking_date", headerName: "Booking Date" ,width:200},
      { field: "start_time", headerName: "Start Time" ,width:200},
      { field: "end_time", headerName: "End Time" ,width:200},
      { field: "status", headerName: "Booking Status" ,width:200},
      ];


      const handleBooking = () => { 
        axios.post("http://localhost:3001/user/cancelSportsBooking")
            .then((result) => {
              SetBookingSuccess(true);
            })
            .catch((err) => {});
     };

      useEffect(() => {
        axios
          .get("http://localhost:3001/user/getSportsHistory")
          .then((response) => {
            setRows(response.data);
            setLoading(false);
          })
          .catch((err) => {});
      }, []);
    
    if(bookingMode){
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div>
        <FormGroup>
          <FormControl>
            <Alert severity="info">
              <div className='custom-ui'>
                <div style={{ height: 400, width: "100%" }}>
                <h1>Are you sure?</h1>
                <p>You want to delete this booking?</p>
                <button onClick={() => {
                  setBookingMode(false);
                  onClose();
                }}>No</button>
                <button
                  onClick={() => {
                    handleBooking();
                    onClose();
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
              </div>
              </Alert>
          </FormControl>
          </FormGroup>
          </div>
            );
          }
        });      
      }
       

      if (rows.length === 0) {
        return <div>No recent booking history</div>;
      }
      return (
        <div className="width100">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid 
              rows={rows}
              columns={columns}
              pageSize={5}
              loading = {loading}
              getRowId={(row) => row.booking_id}
              onRowSelected = {(rowData)=> {
                console.log(rowData);
              }}
            />
            </div>
            <Button style= {{margin:"7px",display:"block",marginLeft:"auto"}}
                variant="contained"
                color="primary"
                onClick = {()=>{
                setBookingMode(true);
                }}
                >
                Cancel Booking
            </Button>
        </div>
      );
      





}
    