import { EventFormActionsType } from "./EventForm.types";
import { createActions } from "./EventForm.actions";
import api from "../../api";
jest.mock("../../api");

describe("Event form actions", () => {
  let dispatch;
  let actions;
  beforeEach(() => {
    dispatch = jest.fn();
    actions = createActions(dispatch);
  });
  describe("updateTouched", () => {
    it("should update touched when called", () => {
      // given
      const updatedTouched = {
        firstName: false,
        lastName: true,
        email: false,
      };
      // when
      actions.updateTouched(updatedTouched);
      // then
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_TOUCHED_UPDATE,
        payload: updatedTouched,
      });
    });
  });
  describe("updateForm", () => {
    it("updates form when called", () => {
      // given
      const form = {
        firstName: "firstName",
        lastName: "lastName",
        email: "ccc@ddd.eee",
        date: new Date(),
      };
      // when
      actions.updateForm(form);
      // then
      expect(dispatch).toBeCalledWith({
        type: EventFormActionsType.EVENT_FORM_UPDATE,
        payload: form,
      });
    });
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
