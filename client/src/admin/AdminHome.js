import React from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { Link } from "react-router-dom";
import EventList from './EventList';
import PendingUserList from "./PendingUserList";

export default function AdminHome() {
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
        <br/>
        <div class="pure-controls">
          <Link to="/admin/events/create" className="pure-button pure-button-primary margin10">Create New Event</Link>
          <Link to="/admin/booking" className="pure-button pure-button-primary margin10">Confirm Booking</Link>
        </div>
        
        <br/>
        <br/>
        <Link to="/admin/user" className="pure-button pure-button-primary">Update User Details</Link>
        <br/>
        <br/>
        <PendingUserList/>
        <br/>
        <br/>
        <EventList/>
      </div>
    );
  } else {
    return redirectHome();
  }
}
