import React, { useState, useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import NoDataFound from "../NoDataFound/NoDataFound";

// Register necessary components with Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const DoughnutChart = ({ labels, data, colors }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mobile devices
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Tablet

  const chartRef = useRef(null);

  const total = data.reduce((sum, value) => sum + value, 0);
  const percentages = data.map((value) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"
  );

  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
        backgroundColor: colors || [],
        hoverBackgroundColor: colors || [],
        borderWidth: 5,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    cutout: "60%",
  };

  const isDataEmpty = data?.every((value) => value === 0);

  const calculateLabelPositions = () => {
    const chart = chartRef.current;
    if (!chart || !chart.chartArea) return [];
    const meta = chart.getDatasetMeta(0); // Get the first dataset meta
    if (!meta || !meta.data) return [];

    return meta.data.map((arc, index) => {
      if (data[index] === 0) return null; // Skip arcs with zero data

      const position = arc.tooltipPosition(); // Tooltip position gives x and y
      return {
        x: position.x,
        y: position.y,
        value: `${percentages[index]}%`,
      };
    });
  };

  const [labelPositions, setLabelPositions] = useState([]);

  useEffect(() => {
    if (!isDataEmpty) {
      const timeout = setTimeout(
        () => setLabelPositions(calculateLabelPositions()),
        100
      );
      return () => clearTimeout(timeout); // Cleanup
    }
  }, [data]);
  
  return isDataEmpty ? (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: { xs: "0rem", sm: "2rem", md: "3rem" }, // Responsive padding
        }}
        className=""
      >
        <NoDataFound />
      </Box>
    </>
  ) : (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Doughnut ref={chartRef} data={chartData} options={options} />
      {labelPositions.map(
        (pos, index) =>
          pos && (
            <Typography
              key={index}
              sx={{
                position: "absolute",
                top: isMobile
                  ? `${pos.y + 10}px`
                  : isTablet
                  ? `${pos.y + 20}px`
                  : `${pos.y}px`,
                left: isMobile
                  ? `${pos.x}px`
                  : isTablet
                  ? `${pos.x + 150}px`
                  : `${pos.x + 30}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "#E9EAEDBF",
                boxShadow: theme.shadows[3],
                borderRadius: "8px",
                padding: isMobile ? ".3rem" : ".5rem",
                textAlign: "center",
                fontSize: isMobile ? "0.8rem" : isTablet ? "0.9rem" : "1rem",
                fontWeight: "900",
                color: theme.palette.text.primary,
              }}
            >
              {pos.value}
            </Typography>
          )
      )}
    </Box>
  );
};

export default DoughnutChart;
