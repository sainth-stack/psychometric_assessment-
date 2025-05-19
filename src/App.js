import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import ConditionsPage from "./pages/ConditionsPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import ResultPage from "./pages/Graphs/ResultPage";
import GoogleLoginComponent from "./components/GoogleLogin/GoogleLoogin";
import toast, { Toaster } from "react-hot-toast";
import TestLanding from "./TestLanding";
import TestCompleted from "./pages/test-completed";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const startQuiz = () => setQuizStarted(true);

  const finishQuiz = () => {
    toast.error("Time's up or Test completed!");
    setQuizStarted(false);
  };

  const handleLogin = () => setIsAuthenticated(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get("candidateId");
    const token = urlParams.get("token");
    const hr = urlParams.get("hr");
    if (candidateId && token) {
      localStorage.setItem("candidateId", candidateId);
      localStorage.setItem("testToken", token);
      localStorage.setItem("hr", hr);
      // No longer setting isAuthenticated here
    } else {
      const storedCandidateId = localStorage.getItem("candidateId");
      const storedToken = localStorage.getItem("testToken");
      if (storedCandidateId && storedToken) {
        console.log("Using stored values:", { storedCandidateId, storedToken });
      }
    }
  }, [window.location.search]);

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
          <Route
            path="/login"
            element={<GoogleLoginComponent onLogin={handleLogin} />}
          />

          <Route
            path="/"
            element={
              <ConditionsPage onStart={startQuiz} />
            }
          />

          <Route
            path="/quiz"
            element={
              quizStarted ? (
                <QuizPage onFinish={finishQuiz} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/result"
            element={
              <ResultPage />
            }
          />
                    <Route
            path="/test-completed"
            element={
              <TestCompleted />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;