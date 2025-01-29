import React from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "../../components/graphs/DoughnutGraph";
import { Box, Grid, Typography } from "@mui/material";
import CustomSubmitButton from "../../components/Button/CustomSubmitBtn";
import { useNavigate } from "react-router-dom";

import "../../styles/MediaQuery.css"

const ResultPage = ({ showFinish }) => {
  const categories =
    useSelector((state) => state?.quizCategories?.responses) || {};

  console.log("Categories from result page:", categories);

  const chartData = Object.values(categories);
  const labels = Object.keys(categories);
  const colors = ["#85823F", "#EBBE2D", "#DA5931"]; 

  const total = chartData.reduce((sum, value) => sum + (value || 0), 0);
  const percentages = chartData.map((value) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"
  );

  console.log("fisish state test", showFinish);

  
  
  const navigate = useNavigate();
  

  const handleLogout = () => {
    // Get the user's email from localStorage
    const userEmail = localStorage.getItem("userEmail");
    console.log("User email:", userEmail);
    localStorage.removeItem("userEmail");
    window.close();
    navigate("/login")
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        padding: { xs: "0rem", md: "2rem" }, // Responsive padding
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: "1200px", // Limit max width
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Percentages Section */}
          <Grid item xs={12} md={6}>
            <Typography
              className="result_heading"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.6rem", md: "2.5rem" }, // Responsive font size
                marginBottom: { xs: "1rem", sm: "2rem" },
                marginLeft: { xs: "", md: "5rem" },
                marginTop: { xs: "15rem", sm: "-10rem" },
              }}
            >
              Personality Breakdown
            </Typography>
            <Grid container spacing={2} mt={4}>
              {labels.map((label, index) => (
                <Grid
                  item
                  xs={12} // Full width on small screens
                  sm={index === 0 ? 12 : 6} // First item takes full width, others take half
                  key={label}
                  className="mobile_percentages tablet_percentages"
                >
                  <Box
                    sx={{ margin: "0 2rem 1rem 4rem" }}
                    className="mobile_percentage tablet_percentage"
                  >
                    <Typography className="percentage_value">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "2.5rem",
                          color: colors[index],
                          display: "inline-block",
                        }}
                      >
                        {percentages[index]}%
                      </span>
                      <br />
                      <span
                        style={{
                          color: "#555",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          display: "inline-block",
                        }}
                      >
                        {label}
                      </span>
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Doughnut Chart Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                padding: { xs: "0", md: "2rem" },
              }}
            >
              <DoughnutChart labels={labels} data={chartData} colors={colors} />
            </Box>

            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomSubmitButton onClick={handleLogout}>
                Finish
              </CustomSubmitButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
