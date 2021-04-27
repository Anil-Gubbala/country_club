import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useLoginValidate } from "../../common/Validate";



export default function SportsList(props) {
    const { loading, userData } = useLoginValidate();
    const [exception, setException] = useState(false);
    const [rows, setRows] = useState([]);
    const [bookingMode, setBookingMode] = useState(false);
    const [unloading, setLoading] = useState(false);
    const columns = [
        { field: "s_name", headerName: "Sports ID" , width:200},
        {field : "start_time", headerName: "Start Time", width:200},
        {field : "end_time", headerName: "End Time", width:200},
        {field : "venue_id", headerName: "Venue", width:200},
      ];
      useEffect(() => {
        setLoading(true);
        axios
          .get("http://localhost:3001/user/getAllSports", {
            params: { date: props.date },
          })
          .then((response) => {
            setRows(response.data);
            setLoading(false);
          })
          .catch((err) => {
            setException(true);
            setLoading(false);
          });
      }, [props.date]);
    
          
      if(userData.user_id) {
          return (               
                    <div className="width100">  
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={3}
                        autoHeight = "true"
                        getRowId={(row) => row.sport_id}
                        onRowSelected = {(rowData)=> {
                        console.log(rowData);
                        }}
                        />
                        <Button style= {{margin:"8px",display:"block",marginLeft:"auto"}}
                        variant="contained"
                        color="primary"
                        onClick = {()=>{
                            setBookingMode(true);
                        }}
                        >
                        View Available Slot
                        </Button>
                         </div>
            );
        }else {
            return (               
                <div className="width100">  
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={3}
                    autoHeight = "true"
                    getRowId={(row) => row.sport_id}
                    onRowSelected = {(rowData)=> {
                    console.log(rowData);
                    }}
                />
                </div>
                );
        }
}