import { Event } from "./models";

export interface EventService {
  createEvent: (event: Event) => Promise<void>
}

export default <EventService> {
  createEvent: (event: Event) => {
    return Promise.resolve();
  }
}