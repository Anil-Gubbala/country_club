import React, { useState } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams } from 'react-router-dom';

let userDetail = {};

const UserDetails = () => {

    Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);

    const updateUserDetails = (user) =>{

    }

    const approveMember = (user) =>{

    }

    const deleteUser = (user) =>{

    }

    Axios.get('http://localhost:3001/admin/users/details/' + id).then(function(res) {
      console.log(res);
      userDetail = res.data;
      setLoading(false);
    });
    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }
    return (
      <fieldset className="user-details">
          <div className="pure-control-group">
            <label for="aligned-name">First Name: </label>
            <label id="aligned-name">{userDetail.f_name}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Last Name: </label>
            <label id="aligned-name">{userDetail.l_name}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Address: </label>
            <label id="aligned-name">
                <p>{userDetail.street}
                <br/>{userDetail.city} , {userDetail.zip_code}
                </p>
            </label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Membership Type: </label>
            <label id="aligned-name">{userDetail.membership_type}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Start Date: </label>
            <label id="aligned-name">{userDetail.start_date}</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">End Date: </label>
            <label id="aligned-name">
              {userDetail.end_date  }</label>
          </div>

          <div className="pure-control-group">
            <label for="aligned-name">Membership Status: </label>
            <label id="aligned-name">{userDetail.status}</label>
          </div>

          <br/>
          <br/>
          <div className="pure-control-group">
            <div class="pure-u-1-6">
            </div>
            {
              userDetail.status === 'pending' &&
              <div class="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={approveMember()}>
                    Approve Memner
                </button>
              </div>
            }
            <div class="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={updateUserDetails()}>
                  Update Details
              </button>
            </div>
            <div class="pure-u-1-6">
            <button className="pure-button pure-button-primary" onClick={deleteUser()}>
                  Delete User
              </button>
            </div>
            <div class="pure-u-1-6">
              <button className="pure-button pure-button-error">
                  Go back
              </button>
            </div>
          </div>
      </fieldset>
    );
}

export default function ViewUserDetails() {
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
          <h1 style={{textAlign:"center"}}>User Details</h1>
          <UserDetails/>
        </form>
      </div>
    );
  } else {
    return redirectHome();
  }
}
