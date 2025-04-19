import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ConditionsPage from "./pages/ConditionsPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ResultPage from "./pages/Graphs/ResultPage";
import GoogleLoginComponent from "./components/GoogleLogin/GoogleLoogin";
import toast, { Toaster } from "react-hot-toast";
import TestLanding from "./TestLanding";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  const startQuiz = () => setQuizStarted(true);

  const finishQuiz = () => {
    toast.error("Time's up or Test completed!");
    setQuizStarted(false);
  };

  const handleLogin = () => setIsAuthenticated(true); // Set authentication state

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "16px" },
        }}
      />

      <Router>
        <Routes>
          <Route path="/test-entry" element={<TestLanding />} />
          {/* Login Route */}
          <Route
            path="/login"
            element={<GoogleLoginComponent onLogin={handleLogin} />}
          />

          {/* Protected Route for Conditions Page */}

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <ConditionsPage onStart={startQuiz} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Protected Route for Quiz Page */}
          <Route
            path="/quiz"
            element={
              isAuthenticated ? (
                quizStarted ? (
                  <QuizPage onFinish={finishQuiz} />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Protected Route for Result Page */}
          <Route
            path="/result"
            element={
              isAuthenticated ? (
                <ResultPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;





