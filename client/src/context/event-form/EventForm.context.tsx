import React, {
  createContext,
  useContext,
  useReducer,
  FC,
} from "react";
import { EventFormState, initState } from "./EventForm.models";
import reducer from "./EventForm.reducer";
import {
  createActions,
  EventFormActions,
  emptyEventFormAction,
} from "./EventForm.actions";

type EventFormContext = {
  state: EventFormState;
  actions: EventFormActions;
};

const EventFormContexImpl = createContext<EventFormContext>({
  state: initState,
  actions: emptyEventFormAction,
});

export const useEventForm = () => useContext(EventFormContexImpl);

export const EventFormProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = {
    state,
    actions: createActions(dispatch),
  };
  return (
    <EventFormContexImpl.Provider value={value}>
      {children}
    </EventFormContexImpl.Provider>
  );
};
