import React from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "../../components/graphs/DoughnutGraph";
import { Box, Grid, Typography } from "@mui/material";

const PieGraphPage = () => {
  const categories = useSelector((state) => state?.quizCategories?.responses);

  console.log("categories", categories);

  const chartData = Object.values(categories);
  const labels = Object.keys(categories);
  const colors = ["#DA5931", "#EBBE2D", "#85823F"]; // Customizable colors

  const total = chartData?.reduce((sum, value) => sum + value, 0);
  const percentages = chartData.map((value) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#fff",
          padding: "1rem", // Increased padding
          borderRadius: 2,
          boxShadow: 3,
        
        }}
      >
        {/* Percentages Section */}
        <Box container direction="column" alignItems="flex-start" spacing={3}>
          <Typography
            variant="h5"
            sx={{
              marginLeft: "2rem",
              fontWeight: "bold",
              padding: "2rem", // Increased padding
              fontSize: "2rem", // Increased font size for title
            }}
          >
            Personality Breakdown
          </Typography>
          {labels.map((label, index) => (
            <Box item key={label}>
              <Typography variant="body1">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                    marginTop: ".2rem",
                    display: "inline-block",
                    color: colors[index],
                  }}
                >
                  {percentages[index]}%
                </span>
                <br />
                <span
                  style={{
                    color: "#555",
                    fontSize: "1.2rem",
                    marginBottom: ".8rem",
                    display: "inline-block",
                    fontWeight: "700",
                  }}
                >
                  {label}
                </span>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Doughnut Chart Section */}
        <Box >
        
          {/* Increased width for Doughnut Chart */}
          <DoughnutChart labels={labels} data={chartData} colors={colors} />
        </Box>
      </Box>
    </Box>
  );
};

export default PieGraphPage;
