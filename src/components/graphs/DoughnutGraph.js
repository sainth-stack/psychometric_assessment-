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

const DoughnutChart = ({ labels, data,colors }) => {
  // const colors = ["#85823F", "#DA5931", "#EBBE2D"]; // Customizable colors
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
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
      title: { display: false },
      legend: { display: false },
    },
    cutout: "60%",
  };

  const isDataEmpty = data?.every((value) => value === 0);

  const calculateLabelPositions = () => {
    const chart = chartRef.current;
    if (!chart || !chart.chartArea) return [];
    const meta = chart.getDatasetMeta(0); 
    if (!meta || !meta.data) return [];

    return meta.data.map((arc, index) => {
      if (data[index] === 0) return null; // Skip arcs with zero data
      const position = arc.tooltipPosition(); // Tooltip position gives x and y
      return { x: position.x, y: position.y, value: `${percentages[index]}%` };
    });
  };

  const [labelPositions, setLabelPositions] = useState([]);

  useEffect(() => {
    if (!isDataEmpty) {
      const timeout = setTimeout(
        () => setLabelPositions(calculateLabelPositions()),
        500
      ); // Wait for chart render
      return () => clearTimeout(timeout); // Cleanup
    }
  }, [data]);

  return isDataEmpty ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: { xs: "0rem", sm: "2rem", md: "3rem" },
      }}
    >
      <NoDataFound />
    </Box>
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
      {labelPositions.map((pos, index) => {
        if (!pos) return null;

        const angle = index / labelPositions.length;
        const radius = isMobile ? 60 : isTablet ? 100 : 140;
        let adjustedX = pos.x+2 + radius * Math.cos(angle+0.5);
        let adjustedY = pos.y+1 + radius * Math.sin(angle-0.2);

        return (
          <Typography
            key={index}
            sx={{
              position: "absolute",
              top: `${adjustedY}px`,
              left: `${adjustedX}px`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "#E9EAEDBF",
              boxShadow: theme.shadows[3],
              borderRadius: "8px",
              padding: isMobile ? ".3rem" : isTablet ? ".4rem" : ".5rem",
              textAlign: "center",
              fontSize: isMobile ? "0.8rem" : isTablet ? "0.9rem" : "1rem",
              fontWeight: "900",
              color: theme.palette.text.primary,
            }}
          >
            {pos.value}
          </Typography>
        );
      })}
    </Box>
  );
};

export default DoughnutChart;
