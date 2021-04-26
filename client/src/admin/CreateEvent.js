import React, { useEffect, useState } from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

const VenueDropdown = (props) => {
  const [venueList, setVenueList] = useState([]);
  useEffect(() => {
      Axios.get('http://localhost:3001/admin/events/create').then(function(res) {
        console.log(res);
        props.setEventDeatilsVenue(res.data[0].venue_id);
        setVenueList(res.data);
      });
  }, []);
  
  return (
    <select id="aligned-status" 
        onChange={(e) => {
          props.setEventDeatilsVenue(e.target.value);
        }}>
        {venueList.map(res =>
            <option key={res.venue_id} value={res.venue_id}>{res.venue_name}</option>
        )}
    </select>
  )
}

export default function CreateEvent() {
  const { loading, userData } = useLoginValidate();
  const defaultValues = {
      event_name: "",
      e_description: "",
      start_date: "",
      end_date: "",
      status: "",
      venue_id: "",
      capacity: "",
      organized_by: "",
  };
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [eventDetails, setEventDetails] = useState(defaultValues);
  
  
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else if (userData.auth_id === 1) {

    Axios.defaults.withCredentials = true;

    const setEventDeatilsVenue = (venueId) => {
      setEventDetails({...eventDetails,venue_id:venueId});
    }

    const createEvent = () => {

        Axios.post("http://localhost:3001/admin/events/create", {
          eventDetails,
        })
          .then((response) => {
            setMessage("Event created successfully.");
            setEventDetails(true);
            history.push("/admin");
          })
          .catch((error) => {
            setMessage(error.response.data.err);
            setEventDetails(false);
          });

    };

    return (
      <div>
        <Navi></Navi>
        <div className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>Create Event</h1>

          <div className="pure-u-1-3"></div>

          <div className="pure-u-1-3">
            <div className="pure-control-group">
              <label htmlFor="aligned-name">Event Name</label>
              <input
                type="text"
                id="aligned-name" placeholder="Event Name" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,event_name:e.target.value});
                }}
              />
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="aligned-description">Event Description</label>
              <input
                type="text"
                id="aligned-description" placeholder="Event Description" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,e_description:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-start-date">Event Start Date</label>
              <input
                type="date"
                id="aligned-start-date"
                onChange={(e) => {
                  setEventDetails({...eventDetails,start_date:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-end-date">Event End Date</label>
              <input
                type="date"
                id="aligned-end-date"
                onChange={(e) => {
                  setEventDetails({...eventDetails,end_date:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-status">Event Status</label>
              <select id="aligned-status" 
                  onChange={(e) => {
                    setEventDetails({...eventDetails,status:e.target.value});
                  }}>
                  <option value="Please select">Please Select</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
              </select>              
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-venue">Venue</label>
              <VenueDropdown setEventDeatilsVenue={setEventDeatilsVenue}/>
            </div>

            <div className="pure-control-group">
              <label htmlFor="aligned-capacity">Capacity</label>
              <input
                type="text"
                id="aligned-capacity" placeholder="Capacity" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,capacity:e.target.value});
                }}
              />
            </div>


            <div className="pure-control-group">
              <label htmlFor="aligned-organiser">Organiser</label>
              <input
                type="text"
                id="aligned-organiser" placeholder="Organiser"
                onChange={(e) => {
                  setEventDetails({...eventDetails,organized_by:e.target.value});
                }}
              />
            </div>

            <div className="pure-controls">
              <button className="pure-button pure-button-primary" onClick={createEvent}>
                  Create Event
              </button>
            </div>
          </div>
          
          <div className="pure-u-1-3"></div>

          <div>{message}</div>
        </div>
      </div>
    );
  } else {
    return redirectHome();
  }
}
