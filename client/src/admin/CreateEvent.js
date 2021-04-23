import React, { useState } from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";

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
    no_of_participants: "",
    organized_by: "",
};

const [message, setMessage] = useState("");
const [eventDetails, setEventDetails] = useState(defaultValues);
  
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else if (userData.auth_id === 1) {

    

    const createEvent = () => {
        //on create function
    };
    //Axios.defaults.withCredentials = true;

    return (
        <div>
        <Navi></Navi>
        <div className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>Create Event</h1>

          <div class="pure-u-1-3"></div>

          <div class="pure-u-1-3">
            <div className="pure-control-group">
              <label for="aligned-name">Event Name</label>
              <input
                type="text"
                id="aligned-name" placeholder="Event Name" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,event_name:e.target.value});
                }}
              />
            </div>
            
            <div className="pure-control-group">
              <label for="aligned-description">Event Description</label>
              <input
                type="text"
                id="aligned-description" placeholder="Event Description" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,e_description:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-start-date">Event Start Date</label>
              <input
                type="date"
                id="aligned-start-date"
                onChange={(e) => {
                  setEventDetails({...eventDetails,start_date:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-end-date">Event End Date</label>
              <input
                type="date"
                id="aligned-end-date"
                onChange={(e) => {
                  setEventDetails({...eventDetails,end_date:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-status">Event Status</label>
              <input
                type="text"
                id="aligned-status" placeholder="Event Status" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,status:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-venue">Venue</label>
              <input
                type="text"
                id="aligned-venue" placeholder="Venue" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,venue_id:1});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-capacity">Capacity</label>
              <input
                type="text"
                id="aligned-capacity" placeholder="Capacity" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,capacity:e.target.value});
                }}
              />
            </div>

            <div className="pure-control-group">
              <label for="aligned-participant">No of Participants</label>
              <input
                type="text"
                id="aligned-participant" placeholder="No of Participants" 
                onChange={(e) => {
                  setEventDetails({...eventDetails,no_of_participants:e.target.value});
                }}
              />
            </div>


            <div className="pure-control-group">
              <label for="aligned-organiser">Organiser</label>
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
          
          <div class="pure-u-1-3"></div>

          <div>{message}</div>
        </div>
      </div>
    );
  } else {
    return redirectHome();
  }
}
