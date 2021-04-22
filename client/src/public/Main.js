import React, { useState } from "react";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrivateEventsList from "../user/private events/PrivateEventsList";

export default function Main() {
  const { loading, userData } = useLoginValidate();
  const [startDate, setStartDate] = useState(new Date());
  const addDays = (date, count) => {
    date.setDate(date.getDate() + count);
    return date;
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navi></Navi>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
      />
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Events</Typography>
        </AccordionSummary>
        <AccordionDetails>Add Events component here</AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sports</Typography>
        </AccordionSummary>
        <AccordionDetails>Add sports component here</AccordionDetails>
      </Accordion>
      <Accordion
        disabled={userData.user_id ? false : true}
        defaultExpanded={userData.user_id ? true : false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>
            Dining {userData.user_id ? "" : " (!Login to access this content)"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>Add Dining component here</AccordionDetails>
      </Accordion>
      <Accordion
        disabled={userData.user_id ? false : true}
        defaultExpanded={userData.user_id ? true : false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>
            Private Events{" "}
            {userData.user_id ? "" : " (!Login to access this content)"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PrivateEventsList date={startDate.toJSON().substr(0, 10)}></PrivateEventsList>
        </AccordionDetails>
      </Accordion>
      <div>
        <div>set user.auth_id = 1 in db to enable admin page</div>
        <div>set user.status = 1 in db to activate registered account</div>
      </div>
    </div>
  );
}
