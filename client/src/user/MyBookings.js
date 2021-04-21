import React from "react";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";
import { Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PrivateEventsHistory from "./private events/PrivateEventsHistory";

export default function MyBookings(props) {
  console.log(props);
  const { loading, userData } = useLoginValidate();
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <Box>
      <Navi></Navi>
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
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Dining</Typography>
        </AccordionSummary>
        <AccordionDetails>Add Dining component here</AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Private Events</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PrivateEventsHistory></PrivateEventsHistory>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
