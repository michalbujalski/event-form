export interface EventFormData {
  id?: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  date: string | null;
}

export interface EventFormErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export const emptyErrors: EventFormErrors = {
  firstName: null,
  lastName: null,
  email: null,
};

export interface EventFormState {
  data: EventFormData;
  isLoading: boolean;
  isSuccess: boolean;
  errors: EventFormErrors;
  touched: EventFormTouched;
}

export const defaultFormValues: EventFormData = {
  firstName: "first ",
  lastName: "",
  email: "",
  date: new Date().toISOString(),
};

export const initState: EventFormState = {
  data: defaultFormValues,
  isLoading: false,
  isSuccess: false,
  errors: emptyErrors,
  touched: {
    firstName: false,
    lastName: false,
    email: false,
  },
};

export interface EventFormTouched {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}
