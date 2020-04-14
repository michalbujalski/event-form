import { Event } from './models';

export interface EventsRepository {
  createEvent: (event: Event) => Promise<void>
}

export default <EventsRepository> {
  createEvent: (event: Event) => {
    return Promise.resolve();
  }
};