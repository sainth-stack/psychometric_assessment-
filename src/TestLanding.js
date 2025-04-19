import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get("candidateId");
    const token = urlParams.get("token");

    if (candidateId && token) {
      localStorage.setItem("candidateId", candidateId);
      localStorage.setItem("testToken", token);

      
      navigate("/login");
    } else {
      alert("Invalid or missing test credentials.");
    }
  }, [navigate]);

  return <div>Preparing your test environment...</div>;
};

export default TestLanding;
