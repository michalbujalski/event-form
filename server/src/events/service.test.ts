import repository from "./repository";
import { isEventValid } from "./validation";
import { Event } from "./models";
import service from "./service";

import { mocked } from "ts-jest/utils";

jest.mock("./validation");
jest.mock("./repository");

describe("event service", () => {
  it("it should create event if valid", async () => {
    // given
    const event: Event = {
      firstName: "first name",
      lastName: "last name",
      email: "aaa@bbb.ccc",
      date: "2020-05-02",
    };
    mocked(repository.createEvent).mockImplementation((event: Event) =>
      Promise.resolve({ ...event, id: "asdf-qwer-zxcv-1234" })
    );
    mocked(isEventValid).mockImplementation((event: Event) => undefined);
    // when
    await service.createEvent(event);
    // then
    expect(repository.createEvent).toBeCalledWith(event);
    expect(isEventValid).toHaveBeenCalledWith(event);
  });
  it("it throws error when form is not valid", async () => {
    // given
    const event: Event = {
      firstName: "first name",
      lastName: "last name",
      email: "aaa@bbb.ccc",
      date: "2020-05-02",
    };
    const mockError = { firstName: "first name must be valid" };
    mocked(repository.createEvent).mockImplementation((event: Event) =>
      Promise.resolve({ ...event, id: "asdf-qwer-zxcv-1234" })
    );
    mocked(isEventValid).mockImplementation((event: Event) => mockError);

    try {
      // when
      await service.createEvent(event);
    } catch (error) {
      // then
      expect(error).toBe(JSON.stringify(mockError));
    }
  });
});
