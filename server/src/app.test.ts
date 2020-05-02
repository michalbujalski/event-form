import request from "supertest";
import { app, server } from "./app";

describe("POST create event", () => {
  it("creates an event if data valid", async () => {
    // given
    const event = {
      firstName: "first name",
      lastName: "last name",
      email: "aaa@bbb.ccc",
      date: "2020-05-10",
    };
    // when
    const result = await request(app).post("/events/create").send(event);
    // then
    expect(result.status).toEqual(200);
    expect(JSON.parse(result.text).id).toBeDefined();
  });
  it("returns error if event is not valid", async () => {
    // given
    const event = {
      firstName: "",
      lastName: "",
      email: "aaa@bb",
      date: null,
    };
    // when
    const result = await request(app).post("/events/create").send(event);
    // then
    expect(result.status).toEqual(400);
    const error = JSON.parse(result.text);
    expect(error).toHaveProperty("firstName");
    expect(error).toHaveProperty("lastName");
    expect(error).toHaveProperty("email");
    expect(error).toHaveProperty("date");
  });
  it("returns a list of events", async () => {
    // when
    const result = await request(app).get("/events");
    // then
    expect(result.status).toEqual(200);
    expect(JSON.parse(result.text)).toBeInstanceOf(Array);
  });
  afterEach(()=>{
    server.close();
  })
});
