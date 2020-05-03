import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import EventFormPage from "./pages/evnet-form/EventForm.page";
import EventDetailsPage from "./pages/event-details/EventDetails.page";
import "./App.css";
import { EventFormProvider } from "./context/event-form/EventForm.context";
import { EventDetailsProvider } from "./context/event-details/EventDetails.context";

const App: FunctionComponent = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/events/new" />
      <Route path="/events/new" exact>
        <EventFormProvider>
          <EventFormPage />
        </EventFormProvider>
      </Route>
      <Route path="/events/details/:id" exact>
        <EventDetailsProvider>
          <EventDetailsPage />
        </EventDetailsProvider>
      </Route>
    </Switch>
  );
};

export default App;
