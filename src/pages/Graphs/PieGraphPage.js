import React from "react";
import { useSelector } from "react-redux";
import PieChart from "../../components/graphs/PieGraph";
import { Box, Paper, Typography } from "@mui/material";

const PieGraphPage = () => {
  const categories = useSelector((state) => state.quizCategories.responses);

  // console.log("categoriq",categories)

  const data = Object.values(categories);
   console.log("data",data)
  const labels = Object.keys(categories);
  const colors = ["#FF6384", "#36A2EB", "#FFCE56"]; // You can customize this or pass it as a prop

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      // sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: "center", width: "30%" }}
      >
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        <PieChart
          labels={labels}
          data={data}
          colors={colors}
          // title="Category Distribution"
        />
      </Paper>
    </Box>
  );
};

export default PieGraphPage;
