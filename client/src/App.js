import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorPath } from "./login/ErrorPath";
import Main from "./public/Main";
import Registration from "./login/Register";
import Login from "./login/Login";
import Logout from "./login/Logout";
import AdminHome from "./admin/AdminHome";
import AdminCreateEvent from "./admin/CreateEvent";
import AdminReadEvent from "./admin/ReadEvent";
import BasePage from "./common/BasePage";
import MyBookings from "./user/MyBookings";
import AdminUserDetails from "./admin/ViewUserDetails";
import AdminUserList from "./admin/UserList";
import AdminCreateAdmin from "./admin/CreateNewAdmin"
import SportsBooking from "./user/sports/SportsBooking";
import SportsList from "./user/sports/SportsList";

function App() {
  return (
    <BasePage>
      <Router
      // Hanldes all url requests
      >
        <Switch>
          <Route
            path="/registration"
            exact
            render={(props) => <Registration />}
          />
          <Route path="/login" exact render={(props) => <Login />} />
          <Route path="/" exact render={(props) => <Main />} />
          <Route path="/logout" exact render={(props) => <Logout />} />
          <Route path="/admin" exact render={(props) => <AdminHome />} />
          <Route path="/admin/events/create" exact render={(props) => <AdminCreateEvent />} />
          <Route path="/user/myBookings" exact render={(props) => <MyBookings />} />
          <Route path="/admin/events/details/:id" exact render={(props) => <AdminReadEvent />} />
          <Route path="/admin/users/details/:id" exact render={(props) => <AdminUserDetails />} />
          <Route path="/admin/user" exact render={(props) => <AdminUserList />} />
          <Route path="/admin/createnewadmin" exact render={(props) => <AdminCreateAdmin />} />
          <Route path="/admin/users/sports" exact render={(props) => <SportsBooking />} />
          <Route path="/admin/users/sportsList" exact render={(props) => <SportsList />} />
          <Route path="*">
            <ErrorPath></ErrorPath>
          </Route>
        </Switch>
      </Router>
    </BasePage>
  );
}

export default App;
