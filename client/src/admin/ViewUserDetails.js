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

<<<<<<< HEAD
    Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const goBackToAdmin = () =>{
      history.push("/admin/users");
    }

    const approveUser = () =>{
      console.log('in method approveUser');
      Axios.post('http://localhost:3001/admin/users/activate', {user_id: id})
        .then((response) => {
            //history.push("/admin");
          })
          .catch((error) => {
          });
    }

    const deleteUser = () =>{
      console.log('in method deleteUser');
      Axios.post('http://localhost:3001/admin/users/delete', {user_id: id})
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
=======
  Axios.defaults.withCredentials = true;
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
>>>>>>> 0a8de62... update functionality to  create event with logged in user

  const history = useHistory();
  const approveUser = () => {
    Axios.post('http://localhost:3001/admin/approvependinguser' + id)
      .then((response) => {
        history.push("/admin");
      })
      .catch((error) => {
      });
  }

  const deleteUser = () => {
    Axios.delete('http://localhost:3001/admin/deleteuser' + id)
      .then((response) => {
        history.push("/admin");
      })
      .catch((error) => {
      });
  }

<<<<<<< HEAD
          <div className="pure-control-group">
            <label htmlFor="aligned-name">Email Id: </label>
            <label id="aligned-name">{userDetail.email_id}</label>
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
            <label id="aligned-name">{userDetail.membership_name}</label>
          </div>
=======
  const goBackToAdmin = () => {
    history.push("/admin");
  }

  Axios.get('http://localhost:3001/admin/users/details/' + id).then(function (res) {
    console.log(res);
    userDetail = res.data;
    setLoading(false);
  });
>>>>>>> 0a8de62... update functionality to  create event with logged in user

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }

<<<<<<< HEAD
          <div className="pure-control-group">
            <label htmlFor="aligned-name">End Date: </label>
            <label id="aligned-name">{userDetail.end_date}</label>
          </div>
=======
  return (
    <fieldset className="user-details">
      <div className="pure-control-group">
        <label htmlFor="aligned-name">First Name: </label>
        <label id="aligned-name">{userDetail.f_name}</label>
      </div>
>>>>>>> 0a8de62... update functionality to  create event with logged in user

      <div className="pure-control-group">
        <label htmlFor="aligned-name">Last Name: </label>
        <label id="aligned-name">{userDetail.l_name}</label>
      </div>

      <div className="pure-control-group">
        <label htmlFor="aligned-name">Address: </label>
        <label id="aligned-name">
          <p>{userDetail.street}
            <br />{userDetail.city} , {userDetail.zip_code}
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

<<<<<<< HEAD
          <br/>
          <br/>
          <div className="pure-control-group">
            {
              (userDetail.status === 'Pending' || userDetail.status === 'Expired') && props.isAdmin === 1 &&
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

            { props.isAdmin === 1 && 
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={deleteUser}>
                      Delete User
                  </button>
                </div>
            }
            { props.isAdmin === 1 && 
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={goBackToAdmin}>
                      Go to User List
                  </button>
                </div>
           }
          </div>
      </fieldset>
    );
=======
      <div className="pure-control-group">
        <label htmlFor="aligned-name">End Date: </label>
        <label id="aligned-name">
          {userDetail.end_date}</label>
      </div>

      <div className="pure-control-group">
        <label htmlFor="aligned-name">Membership Status: </label>
        <label id="aligned-name">{userDetail.status}</label>
      </div>

      <br />
      <br />
      <div className="pure-control-group">
        <div className="pure-u-1-6">
        </div>
        {
          userDetail.status === 'pending' &&
          <div className="pure-u-1-6">
            <button className="pure-button pure-button-primary" onClick={() => approveUser()}>
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
        <div className="pure-u-1-6">
          <button className="pure-button pure-button-primary" onClick={() => goBackToAdmin()}>
            Go Back
              </button>
        </div>
      </div>
    </fieldset>
  );
>>>>>>> 0a8de62... update functionality to  create event with logged in user
}

const UpdateUserDetails = (props) => {

  const history = useHistory();

  const updateUserDetails = () => {
    Axios.post("http://localhost:3001/admin/users/update", 
        { userId: props.details.user_id,
          isAdmin: props.isAdmin,
          street: props.details.street,
          city: props.details.city,
          zip_code: props.details.zip_code,
          start_date: props.details.start_date,
          end_date: props.details.end_date,
          membership_type: props.details.membership_type}
      )
        .then((response) => {
          //history.push("/admin");
        })
        .catch((error) => {
        });

  };

  const cancelUpdate = () => { }

  return (
    <fieldset className="user-details">
<<<<<<< HEAD
        <div className="pure-control-group">
          <label htmlFor="aligned-name">User Id: </label>
          <label id="aligned-name">{props.details.user_id}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">First Name: </label>
          <label id="aligned-name">{props.details.f_name}</label>
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Last Name: </label>
          <label id="aligned-name">{props.details.l_name}</label>
        </div>

        <div className="pure-control-group">
            <label htmlFor="aligned-name">Email Id: </label>
            <label id="aligned-name">{userDetail.email_id}</label>
          </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Street: </label>
          <input
            type="text"
            id="aligned-name" placeholder="Street" 
            value={props.details.street}
            onChange={(e) => {
              props.setUserDetails({...props.details,street:e.target.value});
            }}
          />
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-description">City: </label>
          <input
            type="text"
            id="aligned-description" placeholder="City" 
            value={props.details.city}
            onChange={(e) => {
              props.setUserDetails({...props.details,city:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-description">Zip code: </label>
          <input
            type="text"
            id="aligned-description" placeholder="Zip-Code" 
            value={props.details.zip_code}
            onChange={(e) => {
              props.setUserDetails({...props.details,zip_code:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-start-date">Start Date: </label>
          <input
            type="date"
            id="aligned-start-date"
            value={props.details.start_date}
            onChange={(e) => {
              props.setUserDetails({...props.details,start_date:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-end-date">End Date: </label>
          <input
            type="date"
            id="aligned-end-date"
            value={props.details.end_date}
            onChange={(e) => {
              props.setUserDetails({...props.details,end_date:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-status">Membership: </label>
          {props.isAdmin === 1 && 
              <select
                id="aligned-status" placeholder="Membership" 
                value={props.details.membership_type}
                onChange={(e) => {
                  props.setUserDetails({...props.details,membership_type:e.target.value});
                }}>
                  <option value="0">Silver</option>
                  <option value="1">Gold</option>
                  <option value="2">Platinum</option>
                </select>
          }
          {props.isAdmin === 0 && <label id="aligned-name">{props.details.membership_name}</label>}
        </div>

        <div className="pure-controls">
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={updateUserDetails}>
                  Update User
              </button>
            </div>
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={cancelUpdate}>
                  Cancel
              </button>
            </div>
        </div>
=======
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
            props.setUserDetails({ ...props.userDetails, street: e.target.value });
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
        <button className="pure-button pure-button-primary" onClick={cancelUpdate()}>
          Cancel
          </button>
      </div>

>>>>>>> 0a8de62... update functionality to  create event with logged in user

      <div className="pure-u-1-3"></div>

    </fieldset>
  )

}

const Details = (props) => {
  const [showDetails, setShowDetails] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const updateUserDetails = (details) => {
    setUserDetails(details);
    setShowDetails(false);
  }

  const cancelUpdate = () => {
    setShowDetails(true);
  }

<<<<<<< HEAD
  if (showDetails){
    return (
      <UserDetails updateUserDetails={updateUserDetails} isAdmin={props.isAdmin}/>
      
    )
  } else {
    return (
      <UpdateUserDetails details={userDetails} setUserDetails={setUserDetails} cancelUpdate={cancelUpdate} isAdmin={props.isAdmin}/>
=======
  // const deleteUser = () =>{
  //   setShowDetails(true);
  // }

  // const approveUser =() =>{
  //   setShowDetails(true);
  // }


  //deleteUser={deleteUser} approveUser={approveUser}
  if (showDetails) {
    return (
      <UserDetails updateUserDetails={updateUserDetails} cancelUpdate={cancelUpdate} />

    )
  } else {
    return (
      <UpdateUserDetails details={userDetails} setUserDetails={setUserDetails} />
>>>>>>> 0a8de62... update functionality to  create event with logged in user
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
  } else {
    return (
      <div>
        <Navi></Navi>
        <form className="pure-form pure-form-aligned">
<<<<<<< HEAD
          {userData.auth_id === 1 && <h1 style={{textAlign:"center"}}>User Details</h1>}
          {(userData.auth_id === 0) && <h1 style={{textAlign:"center"}}>My Profile</h1>}
          <Details isAdmin={userData.auth_id}/>
=======
          <h1 style={{ textAlign: "center" }}>User Details</h1>
          <Details />
>>>>>>> 0a8de62... update functionality to  create event with logged in user
        </form>
      </div>
    );
  }
}