import React from "react";
import Button from "@mui/material/Button";

const CustomSubmitButton = ({
  variant = "contained",
  sx = {},
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        margin: 2,
        width: "150px",
        fontFamily: "inherit",
        background: "#847F3B", // Default background
        "&:hover": {
          background: "#6c672e", // Slightly darker hover effect
        },
        ...sx, // Merge custom styles
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomSubmitButton;
