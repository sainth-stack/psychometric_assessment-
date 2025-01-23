import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({
  open,
  onClose,
  message,
  severity = "info",
  duration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Adjust position as needed
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
