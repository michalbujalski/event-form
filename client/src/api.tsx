import { EventFormData } from "./context/event-form/EventForm.models";
import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default {
  createEvent: async (form: EventFormData): Promise<EventFormData> => {
    const response = await apiService.post("/events/create",form);
    return response.data;
  },
};
