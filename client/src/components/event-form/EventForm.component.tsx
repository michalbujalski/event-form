import React, { useState, useEffect, FC } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Box,
  Paper,
} from "@material-ui/core";
import validate from "validate.js";
import DatePicker from "./DatePicker.component";
import {
  EventFormData,
  EventFormTouched,
} from "../../context/event-form/EventForm.models";

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

enum InputType {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
}

interface EventFormProps {
  form: EventFormData;
  updateForm: (form: EventFormData) => void;
  submitForom: () => void;
  isLoading: boolean;
  touched: EventFormTouched;
  updateTouched: (touched: EventFormTouched) => void;
}

interface EventFormErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  date?: string[];
}

function renderErrors(errors: string[]): string {
  return errors.reduce((prev, next) => {
    if (prev.length === 0) {
      return prev;
    }
    return `${prev}, ${next}`;
  });
}

const EventForm: FC<EventFormProps> = ({
  form,
  updateForm,
  submitForom,
  isLoading,
  touched,
  updateTouched,
}) => {
  const [errors, setErrors] = useState<EventFormErrors>({});

  useEffect(() => {
    const validationResult = validate(form, constraints);
    setErrors(validationResult);
  }, [form]);

  const handleDateUpdate = (date: Date | null) => {
    updateForm({ ...form, date: date ? date.toISOString() : null });
  };

  const handleChange = (type: InputType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    switch (type) {
      case InputType.FIRST_NAME: {
        updateForm({
          ...form,
          firstName: value,
        });
        if (!touched.firstName) {
          updateTouched({ ...touched, firstName: true });
        }
        break;
      }
      case InputType.LAST_NAME: {
        updateForm({
          ...form,
          lastName: value,
        });
        if (!touched.lastName) {
          updateTouched({ ...touched, lastName: true });
        }
        break;
      }
      case InputType.EMAIL: {
        updateForm({
          ...form,
          email: value,
        });
        if (!touched.email) {
          updateTouched({ ...touched, email: true });
        }
        break;
      }
      default: {
        throw new Error(`Unknown typ: ${type}`);
      }
    }
  };

  return (
    <Paper elevation={2}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <TextField
                fullWidth
                type="text"
                label="First name"
                inputProps={{
                  "data-testid": "first-name",
                }}
                onChange={handleChange(InputType.FIRST_NAME)}
                disabled={isLoading}
                error={!!errors?.firstName && touched.firstName}
                helperText={
                  errors?.firstName &&
                  touched.firstName &&
                  renderErrors(errors?.firstName)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <TextField
                fullWidth
                type="text"
                label="Last name"
                inputProps={{
                  "data-testid": "last-name",
                }}
                onChange={handleChange(InputType.LAST_NAME)}
                disabled={isLoading}
                error={!!errors?.lastName && touched.lastName}
                helperText={
                  errors?.lastName &&
                  touched.lastName &&
                  renderErrors(errors?.lastName)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                inputProps={{
                  "data-testid": "email",
                }}
                onChange={handleChange(InputType.EMAIL)}
                disabled={isLoading}
                error={!!errors?.email && touched.email}
                helperText={
                  errors?.email && touched.email && renderErrors(errors?.email)
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box pr={4} pl={4} pt={2}>
              <DatePicker
                data-testid="date"
                disabled={isLoading}
                date={form.date ? new Date(Date.parse(form.date)) : null}
                dateUpdate={handleDateUpdate}
                error={!!errors?.date}
                helperText={errors?.date && renderErrors(errors?.date)}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse" p={4}>
            {isLoading && <CircularProgress />}
            <Button
              color="primary"
              variant="contained"
              onClick={submitForom}
              disabled={!!errors || isLoading}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EventForm;
