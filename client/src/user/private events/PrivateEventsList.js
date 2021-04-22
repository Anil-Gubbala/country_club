import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function PrivateEventsList(props) {
  const [data, setData] = useState([]);
  const [exception, setException] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [eventName, setEventName] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [bookingMode, setBookingMode] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [bookingSuccess, SetBookingSuccess] = useState(false);
  const handleBooking = () => {
    if (eventName === "" || attendees > 200) {
      setInvalid(true);
      return;
    } else {
      axios
        .post("http://localhost:3001/user/partyInsert", {
          venue_id: selectedVenue,
          event_name: eventName,
          start_date: props.date,
          end_date: props.date,
          no_of_attendees: attendees,
        })
        .then((result) => {
          SetBookingSuccess(true);
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/partyGetVenues", {
        params: { date: props.date },
      })
      .then((response) => {
        setData(response.data);
        setBookingMode(false);
        SetBookingSuccess(false);
        setSelectedVenue("");
        setEventName("");
      })
      .catch((err) => {
        setException(true);
      });
  }, [props.date]);

  if (bookingSuccess) {
    return (
      <div>
        <FormGroup>
          <FormControl>
            <Alert severity="info">Booking successfull</Alert>
          </FormControl>
          <FormControl>
            <Link className="margin8"
              to="/user/myBookings"
              onClick={() => {
                setBookingMode(false);
                SetBookingSuccess(false);
              }}
            >
              Go to My bookings
            </Link>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
  if (bookingMode) {
    return (
      <div>
        <FormControl>
          <TextField
            id="private-event-name"
            label="Event Name"
            value={eventName}
            error={invalid}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </FormControl>
        {/* {<FormControl>
          <InputLabel htmlFor="private-event-days">No of Days</InputLabel>
          <Select
            labelId="private-event-days-label"
            id="private-event-days"
            value="1"
          >
            <MenuItem value={1}>One Day</MenuItem>
            <MenuItem value={2}>Two Days</MenuItem>
            <MenuItem value={3}>Three Days</MenuItem>
          </Select>
        </FormControl>} */}
        <FormControl>
          <TextField
            error={invalid}
            helperText="Max: 200"
            id="private-event-capacity"
            label="No of Attendees"
            type="number"
            onChange={(e) => setAttendees(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            onClick={() => {
              setBookingMode(false);
            }}
          >
            Go back
          </Button>
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Book
          </Button>
        </FormControl>
      </div>
    );
  }
  if (exception) {
    return <Alert severity="error">Invalid request : server side error</Alert>;
  }
  if (data.length === 0) {
    return <Alert severity="info">No slots available to book today</Alert>;
  }
  return (
    <div className="width100">
      <List>
        {data &&
          data.map((each) => {
            return (
              <ListItem key={each.venue_id}>
                <ListItemText
                  primary={each.venue_name}
                  secondary={"Venue id: " + each.venue_id}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setBookingMode(true);
                      setSelectedVenue(each.venue_id);
                    }}
                  >
                    Select
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}
