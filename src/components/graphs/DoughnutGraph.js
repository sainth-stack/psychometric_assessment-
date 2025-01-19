import React from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut instead of Pie
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Paper } from "@mui/material";

// Register necessary components with Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const DoughnutChart = ({ labels, data, colors, title }) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
        backgroundColor: colors || [],
        hoverBackgroundColor: colors || [],
        borderWidth: 5,
        borderRadius: 10, // Add this line to round the corners
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display:false,
        text: title || "Doughnut Chart", // Display the title if provided
        font: {
          size: 18,
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16, // Increase the font size for the legend
            weight: "bold", // Optional: Make the text bold
          },
          // padding: 20, // Increase the padding between legend items
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${context.label}: ${value}`;
          },
        },
      },
    },
    cutout: "50%", // Adds a hole in the center to create a doughnut effect
  };

  const isDataEmpty = data?.every((value) => value === 0);

  console.log("Data prop", data);

  return isDataEmpty ? (
    <NoDataFound />
  ) : (
      <Paper sx={{ backgroundColor: "#fffafa", borderRadius: 2,objectFit:"contain" }}>
      <Doughnut data={chartData} options={options} /> 
    </Paper>
  );
};

export default DoughnutChart;
