import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoDataFound = () => {

    const navigate = useNavigate(); 

  const handleBackToQuiz = () => {
    navigate("/"); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        // padding: 3,
        textAlign: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="80px"
        height="80px"
        fill="#FF6384"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#FF6384"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M20,50 Q40,30 60,50 Q80,70 100,50"
          stroke="#FF6384"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
        No Data Found || Please Answer The Questions
      </Typography>

      <Button
        variant="contained"
        sx={{  margin:1,width: "160px" }}
        onClick={handleBackToQuiz}
      >
        Back To Quiz !
      </Button>
    </Box>
  );
};

export default NoDataFound;
