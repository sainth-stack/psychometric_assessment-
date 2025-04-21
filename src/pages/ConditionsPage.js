import React, { useEffect, useState } from "react";
import { conditions } from "../data/ConditionsData";
import { Box, Typography, Checkbox, Button, Paper } from "@mui/material";
import logo from "../Images/Logo.png"
import { useNavigate } from "react-router-dom";
import { questions } from "../data/QuestionsData";
import toast from "react-hot-toast";

const ConditionsPage = ({ onStart }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleStart = () => {
    if (checked) {
      onStart();
      navigate("/quiz")
    } else {
      toast.info("Please accept the conditions to start the Test.");
    }
  };


  useEffect(()=>{

    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get("candidateId");
    const token = urlParams.get("token");
    if (candidateId && token) {
      localStorage.setItem("candidateId", candidateId);
      localStorage.setItem("testToken", token);
      // No longer setting isAuthenticated here
    }
const email = localStorage.getItem('userEmail')
if(!email){
  navigate('/login')
}
  },[])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: { xs: "0px", sm: "20px", md: "0px" },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          background: "#fff",
          borderRadius: ".5rem",
          padding: 2,
          width: { xs: "90%", sm: "80%", md: "60%" },
        }}
      >
        {/* Header with logo and title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: 1, sm: 2 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{ marginBottom: { xs: 2, sm: 0 }, marginRight: { sm: -10 } }}
          >
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
              {questions.length} Questions | 15 Minutes
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
                width: { xs: "100%", sm: "auto" },
                color: "#FFFFFF",
                "&:hover": {
                  background: "#6E6B30",
                },
                padding: { xs: "12px 20px", sm: "8px 20px" },
              }}
            >
              Start Test
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConditionsPage;
