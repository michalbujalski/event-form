import React from "react";
import { EventTypeAction } from "./EventDetails.reducer";
import { EventDetailsctionsType } from "./EventDetails.types";
import api from "../../api";

export interface EventDetailsActions {
  fetchDetails: (id: string) => Promise<void>;
}

export const emptyEventDetailsAction: EventDetailsActions = {
  fetchDetails: (id: string) => {
    throw new Error("fetchDetails not initialized");
  },
};

export const createActions = (
  dispatch: React.Dispatch<EventTypeAction>
): EventDetailsActions => ({
  fetchDetails: async (id: string) => {
    dispatch({
      type: EventDetailsctionsType.EVENT_DETAILS_START,
      payload: null
    });
    try {
      const eventDetails = await api.getEvent(id);
      dispatch({
        type: EventDetailsctionsType.EVENT_DETAILS_SUCCESS,
        payload: eventDetails,
      });
    } catch {
      dispatch({
        type: EventDetailsctionsType.EVENT_DETAILS_FAILURE,
        payload: "Error while fetching details",
      });
    }
  },
});
