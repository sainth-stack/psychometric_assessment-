import React from "react";
import { Button, Box, Typography, Grid, Grid2 } from "@mui/material";
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", marginBottom: "0rem" }}>
        <Timer
          onTimeUp={handleTimeUp}
          setIsQuizCompleted={setIsQuizCompleted}
        />
      </Box>

      <Grid2 display={"flex"} flexDirection={"column"} padding={"1.5rem"}> 
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
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "start",
            textAlign: "center",
            marginTop: "1.5rem",
          }}
        >
          {questionData?.options?.map((option, index) => (
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
                  border:
                    selectedAnswer === option.label
                      ? option.isImage && option.image
                        ? "2px solid #EBBE2D"
                        : ""
                      : "1px solid #000",
                  backgroundColor:
                    selectedAnswer === option.label &&
                    !(option.isImage && option.image)
                      ? "#EBBE2D"
                      : "#fff",
                }}
                onClick={() => onOptionSelect(option)} // Pass the option object to handleOptionSelect
              >
                {option.isImage && option.image ? (
                  <img
                    src={option.image}
                    alt={option.option}
                    style={{
                      width: "100px",
                      height: "70px",
                      borderRadius: ".2rem",
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
      </Grid2>
    </Box>
  );
};

export default Question;
