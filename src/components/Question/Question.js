import React from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";
import { questions } from "../../data/QuestionsData";

const Question = ({
  questionData,
  setIsQuizCompleted,
  isQuizCompleted,
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
    <Box
      sx={{
        width: "100%",
        padding: { xs: ".5rem", md: "1rem" },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: {xs:"0",sm:"1"} }}
      >
        <Timer
          setIsQuizCompleted={setIsQuizCompleted}
          onTimeUp={handleTimeUp}
          isQuizCompleted={isQuizCompleted}
        />
      </Box>

      <Box sx={{ padding: { xs: ".5rem", md: "1.5rem" } }}>
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            fontWeight: "600",
            mb: {xs:".5rem", sm:"1rem"},
            textAlign: "left",
          }}
        >
          Question {currentQuestion} / {questions.length}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.5rem" },
            fontWeight: "bold",
            mb: {xs:"1rem", sm:"1.5rem"},
          }}
        >
          {questionData?.question}
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {questionData?.options?.map((option, index) => (
            <Grid
              item
              xs={option.isImage ? 6 : 12} // 2 images per row on small devices
              sm={option.isImage ? 3 : 6}
              md={option.isImage ? 3 : 6}
              key={index}
            >
              <Button
                fullWidth
                sx={{
                  padding: "10px",
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
                  borderRadius: ".5rem",
                }}
                onClick={() => onOptionSelect(option)}
              >
                {option.isImage && option.image ? (
                  <img
                    src={option.image}
                    alt={option.option}
                    loading="lazy"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      borderRadius: ".5rem",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      textAlign: "center",
                    }}
                  >
                    {option.label}. {option.text}
                  </Typography>
                )}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Question;
