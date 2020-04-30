import { EventFormData } from "./context/event-form/EventForm.models";

export default {
  createEvent: (form: EventFormData): Promise<EventFormData> => {
    return new Promise<EventFormData>((resolve, _reject) => {
      setTimeout(() => {
        resolve(form);
      }, 3000);
    });
  },
};
