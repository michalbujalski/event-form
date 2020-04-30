import React, { FunctionComponent } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

interface DatePickerProps {
  error: boolean | undefined;
  helperText: string | undefined;
  date: Date | null;
  disabled: boolean;
  dateUpdate: (date: Date | null) => void;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  date,
  dateUpdate,
  error,
  helperText,
  disabled,
}) => {
  const handleDateChange = (date: Date | null) => {
    dateUpdate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        fullWidth
        inputProps={{
          "data-testid": "date",
        }}
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={date}
        disabled={disabled}
        error={error}
        helperText={helperText}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
