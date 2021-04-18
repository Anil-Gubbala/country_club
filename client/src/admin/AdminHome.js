import React from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { Link } from "react-router-dom";
import EventList from './EventList';


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
        <Link to="/admin/events/create" className="pure-button pure-button-primary">Create New Event</Link>
        <br/>
        <br/>
        <EventList/>
      </div>
    );
  } else {
    return redirectHome();
  }
}
