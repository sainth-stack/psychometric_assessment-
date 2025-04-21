import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import CustomSubmitButton from "../../components/Button/CustomSubmitBtn";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "../../styles/MediaQuery.css";

const ResultPage = ({ showFinish }) => {
  const categories = useSelector((state) => state?.quizCategories?.responses) || {};
  const navigate = useNavigate();

  // Function to submit results to API
  const submitResults = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results: categories,
          userEmail: localStorage.getItem("userEmail")
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit results');
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting results:', error);
      return false;
    }
  };

  const handleFinish = async () => {
    // const submitted = await submitResults();
    // if (submitted) {
      localStorage.removeItem("userEmail");
      window.close();
      navigate("/login");
    // }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        padding: { xs: "0rem", md: "2rem" },
        // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "800px",
          padding: { xs: "2rem", md: "3rem" },
          textAlign: "center",
        }}
      >
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: "5rem", 
            color: "#4CAF50",
            mb: 3
          }} 
        />
        
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            marginBottom: "1rem",
            color: "#333",
          }}
        >
          Assignment Submitted Successfully!
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "#666",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          Thank you for completing the assessment. Your results have been recorded and will be reviewed.
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomSubmitButton 
            onClick={handleFinish}
            sx={{
              padding: "12px 32px",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "8px",
              background: "linear-gradient(90deg, #3f51b5 0%, #2196F3 100%)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Finish
          </CustomSubmitButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultPage;