import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const Loader = ({ open, message = "Loading..." }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" component="p">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loader;
