import {
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrivateEventBookings() {
  axios.defaults.withCredentials = true;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    { field: "p_name", headerName: "Event Name" , width:200},
    { field: "start_date", headerName: "Start Date",width:200 },
    { field: "end_date", headerName: "End Date" ,width:200},
    { field: "hosted_at", headerName: "Venue" ,width:200},
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/user/partyGetBookings")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);


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
          getRowId={(row) => row.party_id}
          onRowSelected = {(rowData)=> {
            console.log(rowData);
          }}
        />
      </div>
    </div>
  );
}
