import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrivateEventBookings() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/partyGetBookings")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  }, []);
  if (data.length === 0) {
    return <div>No recent booking history</div>;
  }
  return (
    <div className="width100">
    <List >
      {data &&
        data.map((each) => {
          return (
            <ListItem key={each.party_id} button={true}>
              <ListItemText primary={each.p_name} secondary={"Event on: " + each.start_date} />
              <ListItemSecondaryAction>
                <Button variant="contained">Cancel</Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
   </div>
  );
}
