import React from "react";
import { Box } from "@material-ui/core";
import { useEventForm } from "../../context/event-form/EventForm.context";
import EventForm from "../../components/event-form/EventForm.component";
import { useHistory } from "react-router-dom";

const EventFormPage = () => {
  const { state, actions } = useEventForm();
  const history = useHistory();
  const handleSubmit = async () => {
    const eventId = await actions.submit(state.data);
    history.replace(`/events/details/${eventId}`);
  };
  return (
    <Box p={2}>
      <EventForm
        form={state.data}
        updateForm={actions.updateForm}
        isLoading={state.isLoading}
        submitForom={handleSubmit}
        updateTouched={actions.updateTouched}
        touched={state.touched}
      />
    </Box>
  );
};

export default EventFormPage;
