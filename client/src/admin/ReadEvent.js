import React, { useState } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams } from 'react-router-dom';

let detail = {};
const Details = () => {

    Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    
    Axios.get('http://localhost:3001/admin/events/details/' + id).then(function(res) {
      console.log(res);
      detail = res.data;
      setLoading(false);
    });
    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    return (
      <fieldset>
          <div className="pure-control-group">
            <label for="aligned-name">Event Name: </label>
            <label id="aligned-name">{detail.event_name}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Event Description: </label>
            <label id="aligned-name">{detail.e_description}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Start Date: </label>
            <label id="aligned-name">{detail.start_date}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">End Date: </label>
            <label id="aligned-name">{detail.end_date}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Event Status: </label>
            <label id="aligned-name">{detail.status}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Event Venue: </label>
            <label id="aligned-name">{detail.venue_id}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Event Capacity: </label>
            <label id="aligned-name">{detail.capacity}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">No of Participants: </label>
            <label id="aligned-name">{detail.no_of_participants}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Event Organiser: </label>
            <label id="aligned-name">{detail.organized_by}</label>
          </div>

          <br/>
          <br/>
          <div className="pure-control-group">
            <div class="pure-u-1-6">
            </div>
            <div class="pure-u-1-6">
              <button className="pure-button pure-button-primary" >
                  Update Event
              </button>
            </div>
            <div class="pure-u-1-6">
            </div>
            <div class="pure-u-1-6">
              <button className="pure-button pure-button-error">
                  Delete Event
              </button>
            </div>
          </div>
      </fieldset>
    );
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
