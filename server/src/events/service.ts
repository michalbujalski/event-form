import { Event } from "./models";
import eventRepository from "./repository";
import { isEventValid } from "./validation";
import { NotFoundError, BadRequestError } from "../errors";

export interface EventService {
  createEvent: (event: Event) => Promise<Event>;
  getEvent: (id: string) => Promise<Event>;
  getAllEvents: () => Promise<Event[]>;
}

export default <EventService>{
  createEvent: (event: Event) => {
    const validationErrors = isEventValid(event);
    if (!validationErrors) {
      return eventRepository.createEvent(event);
    }
    throw new BadRequestError("Event is not valid");
  },
  getEvent: async (id: string) => {
    const event = await eventRepository.getEvent(id);
    if(!event){
      throw new NotFoundError("Event not found")
    }
    return event;
  },
  getAllEvents: () => eventRepository.getAllEvents(),
};
