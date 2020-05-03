import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../../components/event-details/EventDetails.component";
import { Box, CircularProgress } from "@material-ui/core";
import { useEventDetails } from "../../context/event-details/EventDetails.context";
import { useErrorInfo } from "../../context/error-info/ErrorInfo.context";

interface RouteParams {
  id: string;
}

const EventDatailsPage = () => {
  const { id } = useParams<RouteParams>();
  const { actions, state } = useEventDetails();
  const errorInfo = useErrorInfo();
  useEffect(() => {
    actions.fetchDetails(id);
  }, [id]);
  
  useEffect(() => {
    if(state.error){
      errorInfo.actions.setIsOpen(state.error);
    }
  }, [state.error])

  return (
    <Box p={2} display="flex" justifyContent="center" alignItems="center">
      {state.isLoading ? (
        <CircularProgress />
      ) : (
        state.data && 
        <EventDetails
          event={state.data}
        />
      )}
    </Box>
  );
};

export default EventDatailsPage;
