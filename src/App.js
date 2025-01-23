import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConditionsPage from "./pages/ConditionsPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ResultPage from "./pages/Graphs/ResultPage";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => setQuizStarted(true);

  const finishQuiz = () => {
    alert("Time's up or quiz completed!");
    setQuizStarted(false);
  };

  return (
    <Router>
      <Routes>
        {/* Route for the Conditions Page (only shown before quiz starts) */}
        <Route path="/" element={<ConditionsPage onStart={startQuiz} />} />

        {/* Route for the Quiz Page (shown after quiz starts) */}
        <Route
          path="/quiz"
          element={
            quizStarted ? (
              <QuizPage onFinish={finishQuiz} />
            ) : (
              <ConditionsPage onStart={startQuiz} />
            )
          }
        />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
