import React, { useState, useEffect } from "react";
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

    const history = useHistory();

    const goBackToAdmin = () =>{
      history.push("/admin");
    }

    const approveUser = () =>{
      console.log('in method approveUser');
      Axios.post('http://localhost:3001/admin/approvependinguser', {user_id: id})
        .then((response) => {
            //history.push("/admin");
          })
          .catch((error) => {
          });
    }

    const deleteUser = () =>{
      console.log('in method deleteUser');
      Axios.post('http://localhost:3001/admin/deleteuser', {user_id: id})
      .then((response) => {
        //history.push("/admin");
      })
      .catch((error) => {
      });
    }


    useEffect(() => {
      Axios.get('http://localhost:3001/admin/users/details/' + id).then(function(res) {
      console.log(res);
      userDetail = res.data;
      setLoading(false);
      });
    }, []);

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
            
            {
              (userDetail.status === 'Pending' || userDetail.status === 'Expired') &&
              <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={approveUser}>
                    Activate Member
                </button>
              </div>
            }
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={() => props.updateUserDetails(userDetail)}>
                  Update Details
              </button>
            </div>
            <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary" onClick={deleteUser}>
                  Delete User
              </button>
            </div>
            <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary" onClick={goBackToAdmin}>
                  Go Back to Admin
              </button>
            </div>
          </div>
      </fieldset>
    );
}

const UpdateUserDetails = (props) => {
  
  const history = useHistory();
  const updateUserDetails = () => {
    // Axios.post("http://localhost:3001/admin/events/update", 
    //   props.details,
    // )
    //   .then((response) => {
    //     history.push("/admin");
    //   })
    //   .catch((error) => {
    //   });

  };

  const cancelUpdate = () => {} 

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
          <label htmlFor="aligned-name">Street:</label>
          <input
            type="text"
            id="aligned-name" placeholder="Street" 
            value={props.userDetail.street}
            onChange={(e) => {
              props.setUserDetails({...props.userDetails,street:e.target.value});
            }}
          />
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-description">City:</label>
          <input
            type="text"
            id="aligned-description" placeholder="City" 
            value={userDetail.city}
            onChange={(e) => {
              //setEventDetails({...eventDetails,e_description:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-description">Zip code:</label>
          <input
            type="text"
            id="aligned-description" placeholder="Zip-Code" 
            value={userDetail.zip_code}
            onChange={(e) => {
              //setEventDetails({...eventDetails,e_description:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-start-date">Start Date:</label>
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
          <label htmlFor="aligned-end-date">End Date:</label>
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
          <label htmlFor="aligned-status">Membership:</label>
          <input
            type="text"
            id="aligned-status" placeholder="Membership" 
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
        <div className="pure-controls">
          <button className="pure-button pure-button-primary" onClick={cancelUpdate}>
              Cancel
          </button>
        </div>
      

      <div className="pure-u-1-3"></div>
        
    </fieldset>
  )

}

const Details = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const updateUserDetails = (details) => {
    setUserDetails(details);
    setShowDetails(false);
  }

  const cancelUpdate = () =>{
    setShowDetails(true);
  }

  // const deleteUser = () =>{
  //   setShowDetails(true);
  // }

  // const approveUser =() =>{
  //   setShowDetails(true);
  // }


  //deleteUser={deleteUser} approveUser={approveUser}
  if (showDetails){
    return (
      <UserDetails updateUserDetails={updateUserDetails} cancelUpdate={cancelUpdate} />
      
    )
  } else {
    return (
      <UpdateUserDetails details={userDetails} setUserDetails={setUserDetails}/>
    )
  }
  
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
