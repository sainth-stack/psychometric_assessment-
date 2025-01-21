import React, { useEffect, useLayoutEffect, useState } from "react";
import { questions } from "../../data/QuestionsData";
import Question from "../../components/Question/Question";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCategory,
  incrementCategory,
  resetQuiz,
} from "../../redux/features/QuizSlice";
import { useNavigate } from "react-router-dom";

const QuizPage = ({ onFinish }) => {
  const dispatch = useDispatch();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const responses = useSelector((state) => state?.quizCategories?.responses);
  const navigate = useNavigate();
  console.log("responses", responses);

  useLayoutEffect(() => {
    console.log('heeyy')
    const shuffleArray = (array) => {
      console.log('heeyyds')

      const shuffled = [...array]; // Create a copy to avoid mutating the original array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]; // Swap elements
      }
      return shuffled;
    };
    console.log(shuffleArray(questions))
    setCurrentQuestions(shuffleArray(questions));
  }, []);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    console.log("options checkinf", selectedOption);
    if (answers[currentQuestion] !== selectedOption?.label) {
      const updatedAnswers = [...answers];
      const previousAnswer = updatedAnswers[currentQuestion];

      if (previousAnswer) {
        const previousSelectedOption = currentQuestions[currentQuestion].options.find(
          (option) => option.label === previousAnswer
        );
        if (previousSelectedOption) {
          dispatch(
            decrementCategory({ category: previousSelectedOption.category })
          );
        }
      }

      updatedAnswers[currentQuestion] = selectedOption.label;
      setAnswers(updatedAnswers);
      setShowWarning(false);
      dispatch(incrementCategory({ category: selectedOption.category }));
    }
  };

  // Handle next question navigation
  const handleNext = () => {
    if (!answers[currentQuestion]) {
      setShowWarning(true);
      return;
    }
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
      navigate("/result");
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
            questionData={currentQuestions[currentQuestion]}
            currentQuestion={currentQuestion + 1}
            onOptionSelect={handleOptionSelect}
            selectedAnswer={answers[currentQuestion]} // Pass selected answer
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
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
                fontFamily: "inherit",
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
                fontFamily: "inherit",
              }}
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === currentQuestions.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                marginTop: 4,
                padding: "0rem 0rem 1rem 1rem",
                textAlign: "left",
                textDecoration: "none",
                margin: "0px",
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
