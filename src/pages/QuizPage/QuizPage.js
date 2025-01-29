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
import CustomSubmitButton from "../../components/Button/CustomSubmitBtn";
import axios from "axios";
import { ENDPOINT } from "../../utils/EndPoint";

const QuizPage = ({ onFinish }) => {
  const dispatch = useDispatch();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const responses = useSelector((state) => state?.quizCategories?.responses);
  const navigate = useNavigate();
  // console.log("responses", responses);

  useLayoutEffect(() => {
    // console.log('heeyy')
    const shuffleArray = (array) => {
      // console.log('heeyyds')

      const shuffled = [...array]; // Create a copy to avoid mutating the original array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]; // Swap elements
      }
      return shuffled;
    };
    // console.log(shuffleArray(questions))
    setCurrentQuestions(shuffleArray(questions));
  }, []);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

const handleOptionSelect = (selectedOption) => {
  console.log("options checking", selectedOption.category);

  if (answers[currentQuestion] !== selectedOption?.label) {
    const updatedAnswers = [...answers];
    const previousAnswer = updatedAnswers[currentQuestion];

    let previousCategories = [];

    if (previousAnswer) {
      const previousSelectedOption = currentQuestions[
        currentQuestion
      ].options.find((option) => option.label === previousAnswer);

      if (previousSelectedOption) {
        previousCategories = previousSelectedOption.category.flatMap((cat) =>
          cat.split(",")
        );
      }
    }

    updatedAnswers[currentQuestion] = selectedOption.label;
    setAnswers(updatedAnswers);
    setShowWarning(false);

    previousCategories.forEach((cat) => {
      if (!selectedOption.category.includes(cat)) {
        dispatch(decrementCategory({ category: cat.trim() }));
      }
    });

    // Find categories that are newly selected and increment only those
    selectedOption.category
      .flatMap((cat) => cat.split(","))
      .forEach((cat) => {
        if (!previousCategories.includes(cat.trim())) {
          dispatch(incrementCategory({ category: cat.trim() })); // Corrected here
        }
      });
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
    }
  };


  useEffect(() => {
    if (isQuizCompleted) {
      navigate("/result");
    }
  }, [isQuizCompleted, navigate]);

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
    setShowWarning(false);
  };


  /* api call for storing results */
  const handleSubmitResults = async () => {
    console.log("     responses: answers, ", responses);
      const userEmail = localStorage.getItem("userEmail");
      const resultData = {
        email: userEmail,
      results: responses,
      };

      try {
        await axios.post(`${ENDPOINT}/api/users/save-results`, resultData);
        navigate("/result");
      } catch (error) {
        console.error("Error submitting results:", error);
      }
  };



  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 0, sm: 2 },
      }}
    >
      {isQuizCompleted ? (
        // Quiz completion view
        <>Compeleted</>
      ) : (
        // Quiz question view
        <Box
          sx={{
            display: "flex",
            background: "#fff",
            borderRadius: ".5rem",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%", sm: "100%", md: "60%" }, // Responsive width
            minHeight: "60vh",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add slight shadow
          }}
        >
          {/* Question Component */}
          <Question
            isQuizCompleted={isQuizCompleted}
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
              padding: { xs: "0.5rem", sm: "1rem" },
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
            {currentQuestion === currentQuestions.length - 1 ? (
              <CustomSubmitButton onClick={handleSubmitResults}>
                Submit
              </CustomSubmitButton>
            ) : (
              <CustomSubmitButton
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                Next
              </CustomSubmitButton>
            )}
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                marginTop: 4,
                padding: { xs: "0.5rem", sm: "1rem" },
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
