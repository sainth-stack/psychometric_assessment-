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
        display: false, // Disable the title
      },
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${context.label}: ${value}%`; // Format tooltips with percentage
          },
        },
      },
    },
    cutout: "60%", // Adjust the size of the center hole for a cleaner doughnut effect
  };

  const isDataEmpty = data?.every((value) => value === 0);

  console.log("Data prop", data);

  return isDataEmpty ? (
    <NoDataFound />
  ) : (
    <Doughnut data={chartData} options={options} />
  );
};

export default DoughnutChart;
