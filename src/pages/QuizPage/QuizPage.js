import React, { useState } from "react";
import { questions } from "../../data/QuestionsData";
import Question from "../../components/Question/Question";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrementCategory, incrementCategory, resetQuiz } from "../../redux/features/QuizSlice";
import { useNavigate } from "react-router-dom";

const QuizPage = ({ onFinish }) => {
  const dispatch = useDispatch();
  const responses = useSelector((state) => state?.quizCategories?.responses);
const navigate= useNavigate()
  console.log("state validating", responses);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  // Handle option selection
 
  const handleOptionSelect = (selectedOption) => {

    console.log("options checkinf", selectedOption);
    // Check if the current selected option is the same as the previous answer
    if (answers[currentQuestion] !== selectedOption?.label) {
      const updatedAnswers = [...answers];
      const previousAnswer = updatedAnswers[currentQuestion];

      // If there's a previous answer, decrement its category count
      if (previousAnswer) {
        const previousSelectedOption = questions[currentQuestion].options.find(
          (option) => option.label === previousAnswer
        );
        if (previousSelectedOption) {
          dispatch(
            decrementCategory({ category: previousSelectedOption.category })
          );
        }
      }

      // Update the selected answer
      updatedAnswers[currentQuestion] = selectedOption.label;
      setAnswers(updatedAnswers);
      setShowWarning(false);

      // Increment the category count for the newly selected answer
      dispatch(incrementCategory({ category: selectedOption.category }));
    }
  };

  // Handle next question navigation
  const handleNext = () => {
    if (!answers[currentQuestion]) {
      setShowWarning(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
      navigate("/result")
      // Mark quiz as completed
    }
  };

  // Handle back question navigation
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
    setShowWarning(false);
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsQuizCompleted(false);
    dispatch(resetQuiz());
    setShowWarning(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {isQuizCompleted ? (
        // Quiz completion view
        <></>
      ) : (
        // Quiz question view
        <Box
          sx={{
            background: "#fff",
            display: "flex",
            borderRadius: ".5rem",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
          }}
        >
          {/* Question Component */}
          <Question
            setIsQuizCompleted={setIsQuizCompleted}
            questionData={questions[currentQuestion]}
            currentQuestion={currentQuestion + 1}
            onOptionSelect={handleOptionSelect}
            selectedAnswer={answers[currentQuestion]} // Pass selected answer
          />

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "80%",
              alignItems: "flex-end",
              marginTop: 1,
              padding: "1rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              sx={{
                margin: 2,
                width: "150px",
                borderColor: "#000",
                color: "#000",
                "&:hover": {
                  color: "#000",

                  borderColor: "#000",
                  fontWeight: "bold", // Background color on hover
                  transform: "scale(1.005)", // Slight scaling effect
                  transition: "transform 0.2s ease-in-out", // Smooth transition
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                margin: 2,
                width: "150px",
                background: "#847F3B",
              }}
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>

          <Box sx={{ width: "100%", padding: "1rem" }}>
            <Typography
              sx={{
                marginTop: 4,
                padding: "1rem",
                textAlign: "left",
                textDecoration: "none",
                cursor: "pointer",
              }}
              color="primary"
            >
              Report an Issue
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizPage;
