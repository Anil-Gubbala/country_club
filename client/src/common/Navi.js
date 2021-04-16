import React from "react";
import { Link } from "react-router-dom";
import { useLoginValidate } from "./Validate";

const Navi = () => {
  const {userData} = useLoginValidate();
  return (
    <div className="displayFlex">
      <div className ="margin8">
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
      <div className ="margin8">
        <Link to="/registration" className="btn">
          register
        </Link>
      </div>
      {!userData.user_id && (
        <div className ="margin8">
          <Link to="/login" className="btn">
            login
          </Link>
        </div>
      )}
      {userData.user_id && (
        <div  className ="margin8">
          <Link to="/logout" className="btn">
            logout
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navi;
