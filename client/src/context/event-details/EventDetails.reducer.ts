import { EventDetailsctionsType } from "./EventDetails.types";
import { EventDetailsState } from "./EventDetails.models";

export interface EventTypeAction {
  type: EventDetailsctionsType;
  payload: any | null;
}

export default (
  state: EventDetailsState,
  action: EventTypeAction
): EventDetailsState => {
  switch (action.type) {
    case EventDetailsctionsType.EVENT_DETAILS_START: {
      return { ...state, isLoading: true };
    }
    case EventDetailsctionsType.EVENT_DETAILS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case EventDetailsctionsType.EVENT_DETAILS_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
};
