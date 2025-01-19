import React from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";
import { questions } from "../../data/QuestionsData";

const Question = ({
  questionData,
  setIsQuizCompleted,
  currentQuestion,
  onOptionSelect,
  selectedAnswer, // New prop to track the selected answer
}) => {
  const navigate = useNavigate();

  const handleTimeUp = () => {
    alert("Time's up!");
    // navigate("/") // Uncomment for redirecting on timeout
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ display: "flex", marginBottom: "2rem" }}>
        <Timer
          onTimeUp={handleTimeUp}
          setIsQuizCompleted={setIsQuizCompleted}
        />
      </Box>

      {/* Question Text */}
      <Box sx={{ display: "flex", marginBottom: ".2rem" }}>
        <Typography component={"span"}>
          Question {currentQuestion} / {questions.length}
        </Typography>
      </Box>
      <Typography
        component={"span"}
        style={{
          textAlign: "left",
          fontSize: "1.2rem",
          fontWeight: "600",
          marginBottom: "2rem !important",
        }}
      >
        {questionData?.question}
      </Typography>

      {/* Options */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "start",
          textAlign: "center",
          marginTop: "1.5rem",
        }}
      >
        {questionData.options.map((option, index) => (
          <Grid
            item
            xs={option.isImage ? 12 : 6}
            sm={option.isImage ? 12 : 6}
            md={option.isImage ? 3 : 6}
            key={index}
            style={option.isImage ? {} : { margin: ".3rem 0" }}
          >
            <Button
              fullWidth
              sx={{
                padding: "8px 20px",
                textTransform: "none",
                color: "#000",
                border: "1px solid #000",
                backgroundColor:
                  selectedAnswer === option.label ? "#bed2e6" : "#fff", // Highlight selected answer
              }}
              onClick={() => onOptionSelect(option)} // Pass the option object to handleOptionSelect
            >
              {option.isImage && option.image ? (
                <img
                  src={option.image}
                  alt={option.option}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    marginBottom: "0.5rem",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Typography component="span">
                  {option.label}. {option.text}
                </Typography>
              )}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Question;
