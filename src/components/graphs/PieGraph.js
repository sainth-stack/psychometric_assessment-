import React from "react";
import { Pie } from "react-chartjs-2";
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

const PieChart = ({ labels, data, colors, title }) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
        backgroundColor: colors || [],
        hoverBackgroundColor: colors || [],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        // display: true,
        // text: title || "Pie Chart", // Display the title if provided
      },
        legend: {
        //   display:false,
        position: "top",
        labels: {
          font: {
            size: 16, // Increase the font size for the legend
            weight: "bold", // Optional: Make the text bold
          },
          padding: 20, // Increase the padding between legend items
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
    };
    
    const isDataEmpty = data?.every((value) => value === 0);

    console.log("Data prop",data)

  return isDataEmpty ? (
    <NoDataFound />
  ) : (
    <Paper  style={{ padding: "16px" }}>
      <Pie data={chartData} options={options} />
    </Paper>
  );
};

export default PieChart;
