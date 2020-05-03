import { EventFormData } from "./context/event-form/EventForm.models";
import axios from "axios";
import { EventDetailsData } from "./context/event-details/EventDetails.models";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

interface EventResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
}

function convertToEventDetails(response: EventResponse): EventDetailsData {
  return {
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    eventDate: new Date(response.date),
  } as EventDetailsData;
}

export default {
  createEvent: async (form: EventFormData): Promise<EventFormData> => {
    const response = await apiService.post("/events/create", form);
    return response.data;
  },
  getEvent: async (id: string): Promise<EventDetailsData> => {
    const response = await apiService.get<EventResponse>(`/events/${id}`);
    return convertToEventDetails(response.data);
  },
};
