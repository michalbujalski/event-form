import { isEventValid } from "./validation";

describe("validation", () => {
  it("validates invalid new event", () => {
    // given
    const event = {
      firstName: "",
      lastName: "",
      email: "ee",
      date: "",
    };
    // when
    const result = isEventValid(event);
    // then
    expect(result).toHaveProperty("firstName");
    expect(result).toHaveProperty("lastName");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("date");
  });
  it("validates valid new event", () => {
    // given
    const event = {
      firstName: "first",
      lastName: "last",
      email: "eee@fff.com",
      date: "2020-04-10",
    };
    // when
    const result = isEventValid(event);
    // then
    expect(result).toBeUndefined();
  });
});
