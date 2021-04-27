import React, { useState } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";

let userDetail = {};

const UserDetails = (props) => {

    Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);

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
            <label htmlFor="aligned-name">First Name: </label>
            <label id="aligned-name">{userDetail.f_name}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Last Name: </label>
            <label id="aligned-name">{userDetail.l_name}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Address: </label>
            <label id="aligned-name">
                <p>{userDetail.street}
                <br/>{userDetail.city} , {userDetail.zip_code}
                </p>
            </label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Membership Type: </label>
            <label id="aligned-name">{userDetail.membership_type}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Start Date: </label>
            <label id="aligned-name">{userDetail.start_date}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">End Date: </label>
            <label id="aligned-name">
              {userDetail.end_date  }</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Membership Status: </label>
            <label id="aligned-name">{userDetail.status}</label>
          </div>

          <br/>
          <br/>
          <div className="pure-control-group">
            <div className="pure-u-1-6">
            </div>
            {
              userDetail.status === 'pending' &&
              <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={() => approveMember()}>
                    Approve Member
                </button>
              </div>
            }
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={() => props.updateUserDetails()}>
                  Update Details
              </button>
            </div>
            <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary" onClick={() => deleteUser()}>
                  Delete User
              </button>
            </div>
          </div>
      </fieldset>
    );
}

const UpdateUserDetails = () => {
  const [loading, setLoading] = useState(true);
  const defaultValues = {
    street: "",
    city: "",
    zip_code: "",
    start_date: "",
    end_date: "",
    membership_type: "",
    
  };
  const [userDetails, setUserDetails] = useState(defaultValues);
  let { id } = useParams();

  Axios.get('http://localhost:3001/admin/users/details/' + id).then(function(res) {
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
          <div className="pure-control-group">
            <label htmlFor="aligned-name">First Name: </label>
            <label id="aligned-name">{userDetail.f_name}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Last Name: </label>
            <label id="aligned-name">{userDetail.l_name}</label>
          </div>

      <div className="pure-u-1-3">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Street</label>
          <input
            type="text"
            id="aligned-name" placeholder="Event Name" 
            value={userDetail.street}
            onChange={(e) => {
              setUserDetails({...userDetails,street:e.target.value});
            }}
          />
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-description">City</label>
          <input
            type="text"
            id="aligned-description" placeholder="Event Description" 
            value={userDetail.city}
            onChange={(e) => {
              //setEventDetails({...eventDetails,e_description:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-description">Zip code</label>
          <input
            type="text"
            id="aligned-description" placeholder="Event Description" 
            value={userDetail.zip_code}
            onChange={(e) => {
              //setEventDetails({...eventDetails,e_description:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-start-date">Start Date</label>
          <input
            type="date"
            id="aligned-start-date"
            value={userDetail.start_date}
            onChange={(e) => {
              //setEventDetails({...eventDetails,start_date:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-end-date">End Date</label>
          <input
            type="date"
            id="aligned-end-date"
            value={userDetail.end_date}
            onChange={(e) => {
              //setEventDetails({...eventDetails,end_date:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-status">Membership</label>
          <input
            type="text"
            id="aligned-status" placeholder="Event Status" 
            value={userDetail.membership_type}
            onChange={(e) => {
              //setEventDetails({...eventDetails,status:e.target.value});
            }}
          />
        </div>

        <div className="pure-controls">
          <button className="pure-button pure-button-primary">
              Update User
          </button>
        </div>
      </div>

      <div className="pure-u-1-3"></div>
        
    </fieldset>
  )

}

const Details = () => {
  const [showDetails, setShowDetails] = useState(true);
  const updateUserDetails = () => {
    setShowDetails(false);
  }

  if (showDetails){
    return (
      <UserDetails updateUserDetails={updateUserDetails}/>
    )
  } else {
    return (
      <UpdateUserDetails/>
    )
  }
  
}

const approveMember = () =>{

  Axios.defaults.withCredentials = true;
  
  let id = userDetail.user_id;
  console.log(id);
  Axios.put('http://localhost:3001/admin/approvependinguser/', id).then(function(res){
     console.log(res);
  })
}

const deleteUser = () =>{
  let id = userDetail.user_id;
  console.log(id);
  Axios.delete('http://localhost:3001/admin/deleteuser' + id).then(function(res){
    console.log(res);
 })
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
          <Details/>
        </form>
      </div>
    );
  } else {
    return redirectHome();
  }
}
