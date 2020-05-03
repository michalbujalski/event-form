export const initState: EventDetailsState = {
  isLoading: false,
  data: null,
  error: null,
};

export interface EventDetailsData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
}

export interface EventDetailsState {
  isLoading: boolean;
  data: EventDetailsData | null;
  error: string | null;
}
