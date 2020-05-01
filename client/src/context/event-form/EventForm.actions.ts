import React from "react";
import { EventFormData, EventFormTouched } from "./EventForm.models";
import { EventTypeAction } from "./EventForm.reducer";
import { EventFormActionsType } from "./EventForm.types";
import api from "../../api";

export interface EventFormActions {
  submit: (eventForm: EventFormData) => Promise<void>;
  updateForm: (updatedForm: EventFormData) => void;
  updateTouched: (updatedTouched: EventFormTouched) => void;
}

export const emptyEventFormAction: EventFormActions = {
  submit: (_form: EventFormData) => {
    throw new Error("submit not initialized");
  },
  updateForm: (_updatedForm: EventFormData) => {
    throw new Error("update form not initialized");
  },
  updateTouched: (_updatedTouched: EventFormTouched) => {
    throw new Error("update form not initialized");
  },
};

export const createActions = (
  dispatch: React.Dispatch<EventTypeAction>
): EventFormActions => ({
  submit: async (eventForm: EventFormData) => {
    dispatch({
      type: EventFormActionsType.EVENT_FORM_SUBMIT_START,
      payload: null,
    });
    try {
      const response = await api.createEvent(eventForm);
      dispatch({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_SUCCESS,
        payload: response,
      });
    } catch {
      dispatch({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_FAILURE,
        payload: null,
      });
    }
  },
  updateForm: (updatedForm: EventFormData) => {
    dispatch({
      type: EventFormActionsType.EVENT_FORM_UPDATE,
      payload: updatedForm,
    });
  },
  updateTouched: (updatedTouched: EventFormTouched) => {
    dispatch({
      type: EventFormActionsType.EVENT_FORM_TOUCHED_UPDATE,
      payload: updatedTouched,
    });
  },
});
