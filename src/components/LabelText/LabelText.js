import React from "react";
import { Box, Typography } from "@mui/material";

const LabelText = ({ text }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa", // Light background
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Shadow effect
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px", // Bigger font size
          fontWeight: "bold", // Bold text
          color: "#333", // Dark text color
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", // Text shadow
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LabelText;
