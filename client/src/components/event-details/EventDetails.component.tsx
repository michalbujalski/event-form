import React, { FC } from "react";
import { EventDetailsData } from "../../context/event-details/EventDetails.models";
import { Paper, Grid, Box, Typography } from "@material-ui/core";

interface EventDetailsProps {
  event: EventDetailsData;
}

const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  return (
    <Paper elevation={2}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} md={2}>
            <Typography variant="caption">First name</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="body1">{event.firstName}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="caption">Last name</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="body1">{event.lastName}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="caption">Email</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="body1">{event.email}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="caption">Event date</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="body1">{event.eventDate.toISOString()}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EventDetails;
