import { Event } from "./models";
import mongoose, { Schema, Document } from "mongoose";

mongoose.connect(process.env.DB_URL, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface EventDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
}

const eventSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
});

const EventModel = mongoose.model<EventDocument>("Event", eventSchema);

export interface EventsRepository {
  createEvent: (event: Event) => Promise<Event>;
  getAllEvents: () => Promise<Event[]>;
}

export default <EventsRepository>{
  createEvent: async (event: Event) => {
    console.log(event);
    const eventModel = new EventModel({
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      date: new Date(event.date),
    });
    const saved = await eventModel.save();
    event.id = saved._id;
    return event;
  },
  getAllEvents: async () => {
    const results = await EventModel.find().exec();
    const events: Event[] = results.map((doc) => {
      return <Event>{
        id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        date: doc.date.toISOString(),
      };
    });
    return events;
  },
};
