import { Event } from "./models";
import { v4 as uuidv4 } from 'uuid';

const map = new Map<String, Event>();

export interface EventsRepository {
  createEvent: (event: Event) => Promise<Event>;
  getAllEvents: () => Promise<Event[]>;
}

export default <EventsRepository>{
  createEvent: (event: Event) => {
    return new Promise((resolve, reject) => {
      event.id = uuidv4();
      map.set(event.id, event);
      resolve(event);
    });
  },
  getAllEvents: () => new Promise((resolve, _reject)=>{
    resolve(Array.from(map.values()));
  }),
};
