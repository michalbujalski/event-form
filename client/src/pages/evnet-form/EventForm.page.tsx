import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useEventForm } from "../../context/event-form/EventForm.context";
import EventForm from "../../components/event-form/EventForm.component";

const EventFormPage = () => {
  const { state, actions } = useEventForm();
  const handleSubmit = () => {
    actions.submit(state.data);
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
