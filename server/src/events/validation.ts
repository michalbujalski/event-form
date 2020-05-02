import validate from "validate.js";
import { Event } from "./models";

const constraints = {
  firstName: {
    presence: {
      allowEmpty: false,
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
    },
  },
  email: {
    email: {
      message: "must be valid",
    },
  },
  date: {
    presence: {
      allowEmpty: false,
    },
  },
};

export const isEventValid = (event: Event): any => {
  return validate(event, constraints);
};
