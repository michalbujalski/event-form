import React, { createContext, useContext, useReducer, FC } from "react";
import { EventDetailsState, initState } from "./EventDetails.models";
import reducer from "./EventDetails.reducer";
import {
  createActions,
  EventDetailsActions,
  emptyEventDetailsAction,
} from "./EventDetails.actions";

type EventDetailsContext = {
  state: EventDetailsState;
  actions: EventDetailsActions;
};

const EventDetailContexImpl = createContext<EventDetailsContext>({
  state: initState,
  actions: emptyEventDetailsAction,
});

export const useEventDetails = () => useContext(EventDetailContexImpl);

export const EventDetailsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = {
    state: { ...state },
    actions: { ...createActions(dispatch) },
  };
  return (
    <EventDetailContexImpl.Provider value={value}>
      {children}
    </EventDetailContexImpl.Provider>
  );
};
