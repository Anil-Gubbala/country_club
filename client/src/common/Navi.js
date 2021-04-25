import React from "react";
import { Link } from "react-router-dom";
import { useLoginValidate } from "./Validate";

const Navi = () => {
  const { userData } = useLoginValidate();
  return (
    <div className="pure-menu pure-menu-horizontal">
      <a href="/" className="pure-menu-heading pure-menu-link">
        Country Club
      </a>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to="/" className="pure-menu-link">
            Home
          </Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/registration" className="pure-menu-link">
            Register
          </Link>
        </li>
        {!userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/login" className="pure-menu-link">
              Login
            </Link>
          </li>
        )}
        {userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/logout" className="pure-menu-link">
              Logout
            </Link>
          </li>
        )}
        {userData.user_id && userData.auth_id === 1 && (
          <li className="pure-menu-item">
            <Link to="/admin" className="pure-menu-link">
              Admin
            </Link>
          </li>
        )}
        {userData.user_id && (
          <li className="pure-menu-item">
            <Link to="/user/myBookings" className="pure-menu-link">
              My Bookings
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};
export default Navi;
