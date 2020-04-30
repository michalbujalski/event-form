import { EventFormActionsType } from "./EventForm.types";
import { EventFormState } from "./EventForm.models";

export interface EventTypeAction {
  type: EventFormActionsType;
  payload: any | null;
}

export default (
  state: EventFormState,
  action: EventTypeAction
): EventFormState => {
  switch (action.type) {
    case EventFormActionsType.EVENT_FORM_SUBMIT_START: {
      return { ...state, isLoading: true, isSuccess: false };
    }
    case EventFormActionsType.EVENT_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    }
    case EventFormActionsType.EVENT_FORM_SUBMIT_FAILURE: {
      return { ...state, isLoading: false, isSuccess: false };
    }
    case EventFormActionsType.UPDATE_EVENT_FORM: {
      return { ...state, data: action.payload };
    }
    case EventFormActionsType.EVENT_FORM_TOUCHED_UPDATE: {
      return { ...state, touched: action.payload };
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};
