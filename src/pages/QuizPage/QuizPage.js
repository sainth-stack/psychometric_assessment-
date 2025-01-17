import React, { useState } from "react";
import { questions } from "../../data/QuestionsData";
import Question from "../../components/Question/Question";
import { Button, Box, Typography } from "@mui/material";

const QuizPage = ({ onFinish }) => {
  const [responses, setResponses] = useState({
    DisruptiveInnovator: 0,
    RealWorlders: 0,
    ImplementationSpecialists: 0,
  });

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Handle option selection
 const handleOptionSelect = (selectedOption) => {
   if (answers[currentQuestion] !== selectedOption.label) {
     // Check if the option is different from the previous selection
     const updatedAnswers = [...answers];
     const previousAnswer = updatedAnswers[currentQuestion];

     // Update the selected answer
     updatedAnswers[currentQuestion] = selectedOption.label;
     setAnswers(updatedAnswers);

     // Increment the category count for the selected answer
     setResponses((prevResponses) => ({
       ...prevResponses,
       [selectedOption.category]: prevResponses[selectedOption.category] + 1, // Increment category count only once per question
     }));
   }
 };


  // Handle next question navigation
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true); // Mark quiz as completed
    }
  };

  // Handle back question navigation
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsQuizCompleted(false);
    setResponses({
      DisruptiveInnovator: 0,
      RealWorlders: 0,
      ImplementationSpecialists: 0,
    });
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
        <Box
          sx={{
            textAlign: "center",
            padding: "2rem",
            background: "#fff",
            borderRadius: "0.5rem",
            width: "50%",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            Quiz Completed!
          </Typography>

          {/* Display Category Response Counts */}
          <Box sx={{ marginBottom: "1rem" }}>
            <Typography variant="h6">Category Response Counts:</Typography>
            <Typography variant="body1">
              Disruptive Innovators: {responses["DisruptiveInnovator"]}
            </Typography>
            <Typography variant="body1">
              Real Worlders: {responses["RealWorlders"]}
            </Typography>
            <Typography variant="body1">
              Implementation Specialists:{" "}
              {responses["ImplementationSpecialists"]}
            </Typography>
          </Box>

          <Button variant="contained" onClick={handleRestartQuiz}>
            Restart Quiz
          </Button>
        </Box>
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
              sx={{ margin: 2, width: "150px" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 2, width: "150px" }}
              onClick={handleNext}
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
