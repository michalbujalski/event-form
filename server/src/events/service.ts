import { Event } from "./models";
import eventRepository from "./repository";
import { isEventValid } from "./validation";

export interface EventService {
  createEvent: (event: Event) => Promise<Event>;
  getAllEvents: () => Promise<Event[]>;
}

export default <EventService>{
  createEvent: (event: Event) => {
    const validationErrors = isEventValid(event);
    if (!validationErrors) {
      return eventRepository.createEvent(event);
    }
    throw JSON.stringify(validationErrors);
  },
  getAllEvents: () => eventRepository.getAllEvents(),
};
