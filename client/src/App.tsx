import React, { FunctionComponent } from "react";
import EventFormPage from "./pages/evnet-form/EventForm.page";
import "./App.css";
import { EventFormProvider } from "./context/event-form/EventForm.context";

const App: FunctionComponent = () => {
  return (
    <EventFormProvider>
      <EventFormPage />
    </EventFormProvider>
  );
};

export default App;
