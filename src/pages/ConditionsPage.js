import React, { useState } from "react";
import { conditions } from "../data/ConditionsData";
import { Box, Typography, Checkbox, Button, Paper } from "@mui/material";
import logo from "../Images/Logo.png"
import { useNavigate } from "react-router-dom";
const ConditionsPage = ({ onStart }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleStart = () => {
    if (checked) {
      onStart();
      navigate("/quiz")
    } else {
      alert("Please accept the conditions to start the quiz.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          background: "#fff",
          borderRadius: ".5rem",
          padding: 2,
          width: "60%",
        }}
      >
        {/* Header with logo and title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Box sx={{ marginRight: -10 }}>
            <img
               src={logo} // Replace with your logo URL
              alt="Company Logo"
              style={{ height: "70px" }}
            />
          </Box>

          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Psychometric Test
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              3 Questions | 5 Minutes
            </Typography>
          </Box>
        </Box>

        {/* Instructions */}
        <Paper
          sx={{
            maxWidth: 850,
            margin: "0 auto",
            padding: 2,
            borderRadius: "0.4rem",
            border: "1px solid #9d9d9d",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontSize: "1.5rem", marginBottom: 2 }}
          >
            Instructions
          </Typography>
          <ul style={{ textAlign: "left" }}>
            {conditions.map((condition, index) => (
              <li
                key={index}
                style={{ marginBottom: "10px", fontWeight: "300" }}
              >
                {condition}
              </li>
            ))}
          </ul>
        </Paper>

        {/* Checkbox to accept terms */}
        <Box
          sx={{
            maxWidth: 850,
            margin: "0 auto",
            padding: 2,
          }}
        >
          {/* Checkbox to accept terms */}
          <Box sx={{ marginTop: 2, display: "flex", justifyContent: "start" }}>
            <label>
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                sx={{ marginRight: 1 }}
              />
              I accept all terms & conditions
            </label>
          </Box>

          {/* Start Button */}
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleStart}
              disabled={!checked}
              sx={{
                background: "#847F3B",
                color: "#FFFFFF",
                "&:hover": {
                  background: "#6E6B30",
                },
               
              }}
            >
              Start Quiz
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConditionsPage;
