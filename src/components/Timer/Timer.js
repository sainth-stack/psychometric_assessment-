import React, { useEffect, useState } from "react";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Button, Typography } from "@mui/material";
import TimerSharpIcon from "@mui/icons-material/TimerSharp";

const Timer = ({ onTimeUp,setIsQuizCompleted, onFinish, initialTime = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // Set default to 5 minutes (300 seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp(); // Trigger the onTimeUp callback
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval when the component is unmounted
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "1rem 2rem",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TimerSharpIcon sx={{ fontSize: 50 }} />
        <Typography component="span" sx={{ fontWeight: 300 }}>
          Remaining Time:
          <Typography
            component="span"
            sx={{
              display: "flex",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginLeft: "0.5rem",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Typography>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onFinish}
          sx={{
            padding: "10px 20px",
            fontSize: "1rem",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
