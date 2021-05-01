import React, { useState, useEffect  } from "react";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

var rows = [];
export default function ViewDependents() {
    Axios.defaults.withCredentials = true;
    
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        Axios.get('http://localhost:3001/admin/users/view/dependent/' + id).then(function(res) {
        console.log(res);
        rows = res.data;
        setLoading(false);
        });
      }, []);

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  } else {
    return (
        
        <div className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>Dependents List</h1>
          <table className="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dependent Name</th>
                        <th>Relationship</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(res =>
                        <tr key={res.user_id} data-key={res.user_id}>
                          <td>{res.name}</td>
                          <td>{res.relationship}</td>
                          <td>Delete</td>                          
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            <br/>
        </div>
    );
  }
}
