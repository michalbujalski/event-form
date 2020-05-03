import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import EventFormPage from "./pages/evnet-form/EventForm.page";
import EventDetailsPage from "./pages/event-details/EventDetails.page";
import "./App.css";
import { EventFormProvider } from "./context/event-form/EventForm.context";
import { EventDetailsProvider } from "./context/event-details/EventDetails.context";
import { ErrorInfoProvider } from "./context/error-info/ErrorInfo.context";
import ErrorInfo from "./components/error-info/ErrorInfo.component";

const App: FunctionComponent = () => {
  return (
    <ErrorInfoProvider>
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
      <ErrorInfo />
    </ErrorInfoProvider>
  );
};

export default App;
