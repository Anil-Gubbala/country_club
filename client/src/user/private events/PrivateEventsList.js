import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivateEventsList(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const handleBooking = (venueId) => {
    
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/partyGetVenues", {
        params: { date: props.date.toJSON().substr(0, 10) },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [props.date]);
  if (error) {
    return <div> Invalid request : server side error </div>;
  }
  if (data.length === 0) {
    return <div>No slots available to book today</div>;
  }

  return (
    <div>
      {data &&
        data.map((each) => {
          return (
            <div key={each.venue_id}>
              <div>venue_id: {each.venue_id} venue_name: {each.venue_name}</div>
              {<button onClick={()=>{handleBooking(each.venue_id)}}>Book</button>
              }
            </div>
          );
        })}
    </div>
  );
}
