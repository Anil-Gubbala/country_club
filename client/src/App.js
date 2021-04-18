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
import BasePage from "./common/BasePage";

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
          <Route path="*">
            <ErrorPath></ErrorPath>
          </Route>
        </Switch>
      </Router>
    </BasePage>
  );
}

export default App;
