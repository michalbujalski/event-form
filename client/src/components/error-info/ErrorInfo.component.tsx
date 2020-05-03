import React, { FC } from "react";
import { Snackbar, SnackbarContent, withStyles, WithStyles } from "@material-ui/core";
import red from '@material-ui/core/colors/red';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useErrorInfo } from "../../context/error-info/ErrorInfo.context";

const styles = () => ({
  errorInfo: {
    color: "white",
    backgroundColor: red[600],
  },
});

interface ErrorInfoProps extends WithStyles<typeof styles> {
  classes: {
    errorInfo: string;
  }
}

const ErrorInfoComponent:FC<ErrorInfoProps> = ({classes}) => {
  const {state, actions} = useErrorInfo();
  const handleClose = () => {
    actions.close();
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      onClose={handleClose}
      open={state.isOpen}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
    >
      <SnackbarContent
        className={classes.errorInfo}
        message={<span id="message-id">{state.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default withStyles(styles)(ErrorInfoComponent);
