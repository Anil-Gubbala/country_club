import React, { useState } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams } from 'react-router-dom';

let details = {};
//let eventDetails = {};

const ReadDetails = (props) => {
  Axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  Axios.get('http://localhost:3001/admin/events/details/' + id).then(function(res) {
      console.log(res);
      details = res.data;
      setLoading(false);
    });

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }

  return (
    <fieldset>
      <div className="pure-u-1-3"></div>

      <div className="pure-u-1-3">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Name: </label>
          <label id="aligned-name">{details.event_name}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Description: </label>
          <label id="aligned-name">{details.e_description}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Start Date: </label>
          <label id="aligned-name">{details.start_date}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">End Date: </label>
          <label id="aligned-name">{details.end_date}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Status: </label>
          <label id="aligned-name">{details.status}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Venue: </label>
          <label id="aligned-name">{details.venue_name}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Capacity: </label>
          <label id="aligned-name">{details.capacity}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">No of Participants: </label>
          <label id="aligned-name">{details.no_of_participants}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Event Organiser: </label>
          <label id="aligned-name">{details.organized_by}</label>
        </div>

        <br/>
        <br/>
        <div className="pure-control-group">
          <div className="pure-u-1-6">
          </div>
          <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary" 
                  onClick={ () =>
                            props.updateEvent()}>
                Update Event
            </button>
          </div>
          <div className="pure-u-1-6">
          </div>
          <div className="pure-u-1-6">
            <button className="pure-button pure-button-error">
                Delete Event
            </button>
          </div>
        </div>

      </div>

      <div className="pure-u-1-3"></div>
        
    </fieldset>
  );

}

const UpdateDetails = () => {
    const [loading, setLoading] = useState(true);
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
    const [eventDetails, setEventDetails] = useState(defaultValues);
    let { id } = useParams();

    Axios.get('http://localhost:3001/admin/events/details/' + id).then(function(res) {
      console.log(res.data);
      //setEventDetails(res.data);
      setLoading(false);
    });

    if (loading) {
      return <BasePage> Loading data.... </BasePage>;
    }
    return (
      <fieldset>

        <div className="pure-u-1-3"></div>

        <div className="pure-u-1-3">
          <div className="pure-control-group">
            <label htmlFor="aligned-name">Event Name</label>
            <input
              type="text"
              id="aligned-name" placeholder="Event Name" 
              value={details.event_name}
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
              value={details.e_description}
              onChange={(e) => {
                //setEventDetails({...eventDetails,e_description:e.target.value});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-start-date">Event Start Date</label>
            <input
              type="date"
              id="aligned-start-date"
              value={details.start_date}
              onChange={(e) => {
                //setEventDetails({...eventDetails,start_date:e.target.value});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-end-date">Event End Date</label>
            <input
              type="date"
              id="aligned-end-date"
              value={details.end_date}
              onChange={(e) => {
                //setEventDetails({...eventDetails,end_date:e.target.value});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-status">Event Status</label>
            <input
              type="text"
              id="aligned-status" placeholder="Event Status" 
              value={details.status}
              onChange={(e) => {
                //setEventDetails({...eventDetails,status:e.target.value});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-venue">Venue</label>
            <input
              type="text"
              id="aligned-venue" placeholder="Venue" 
              value={details.venue_id}
              onChange={(e) => {
                //setEventDetails({...eventDetails,venue_id:1});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-capacity">Capacity</label>
            <input
              type="text"
              id="aligned-capacity" placeholder="Capacity" 
              value={details.capacity}
              onChange={(e) => {
                //setEventDetails({...eventDetails,capacity:e.target.value});
              }}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-participant">No of Participants</label>
            <input
              type="text"
              id="aligned-participant" placeholder="No of Participants" 
              value={details.no_of_participants}
              onChange={(e) => {
                //setEventDetails({...eventDetails,no_of_participants:e.target.value});
              }}
            />
          </div>


          <div className="pure-control-group">
            <label htmlFor="aligned-organiser">Organiser</label>
            <input
              type="text"
              id="aligned-organiser" placeholder="Organiser"
              value={details.organized_by}
              onChange={(e) => {
                //setEventDetails({...eventDetails,organized_by:e.target.value});
              }}
            />
          </div>

          <div className="pure-controls">
            <button className="pure-button pure-button-primary">
                Update Event
            </button>
          </div>
        </div>

        <div className="pure-u-1-3"></div>
          
      </fieldset>
    )

}



const Details = () => {
    const [showDetails, setShowDetails] = useState(true);
    const updateEvent = () => {
      setShowDetails(false);
    }
  
    if (showDetails){
      return (
        <ReadDetails updateEvent={updateEvent}/>
      )
    } else {
      return (
        <UpdateDetails/>
      )
    }
    
}

export default function ReadEvent() {
  Axios.defaults.withCredentials = true;
  const { loading, userData } = useLoginValidate();
  
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else if (userData.auth_id === 1) {
    return (
      <div>
        <Navi></Navi>
        <form className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>Event Details</h1>
          <Details/>
        </form>
      </div>
    );
  } else {
    return redirectHome();
  }
}
