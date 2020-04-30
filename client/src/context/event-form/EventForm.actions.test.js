import { EventFormActionsType } from "./EventForm.types";
import { createActions } from "./EventForm.actions";
import api from "../../api";
jest.mock("../../api");

describe("Event form actions", () => {
  let dispatch;
  let actions;
  beforeAll(() => {
    dispatch = jest.fn();
    actions = createActions(dispatch);
  });
  describe("submit", () => {
    it("handle create event success", async () => {
      // given
      const form = {
        firstName: "firstName",
        lastName: "lastName",
        email: "aaa@bbb.ccc",
        date: new Date(),
      };
      api.createEvent.mockImplementation(() => {
        return Promise.resolve(form);
      });
      // when
      await actions.submit(form);
      // then
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_START,
        payload: null,
      });
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_SUCCESS,
        payload: form,
      });
    });
    it("handle create event error", async () => {
      // given
      const form = {
        firstName: "firstName",
        lastName: "lastName",
        email: "aaa@bbb.ccc",
        date: new Date(),
      };
      api.createEvent.mockImplementation(() => {
        return Promise.reject();
      });
      // when
      await actions.submit(form);
      // then
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_START,
        payload: null,
      });
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_SUBMIT_FAILURE,
        payload: null,
      });
    });
  });
});
