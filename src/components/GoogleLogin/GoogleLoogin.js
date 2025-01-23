import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Backdrop, Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { REACT_APP_GOOGLE_CLIENT_ID } from "../../utils/GoogleLogin";
import { ENDPOINT } from "../../utils/EndPoint";
import toast from "react-hot-toast";

const GoogleLoginComponent = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [loading, setLoading] = useState(false);
  // Handle successful Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const { credential } = credentialResponse;

      const response = await axios.post(`${ENDPOINT}/api/users/google-login`, {
        token: credential,
      });

      console.log("User details saved:", response.data);
      setLoading(false);
toast.success("Login successful!");
      if (onLogin) onLogin(response.data);
      navigate("/"); // Redirect to ConditionsPage
    } catch (error) {
      console.error(
        "Error during Google login:",
        error.response?.data || error.message
      );
      
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Handle Google login failure
  const handleGoogleFailure = () => {
    console.error("Google login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          // backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            maxWidth: 400,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: "#1976d2",
            }}
          >
            Welcome!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Sign in with your Google account to continue.
          </Typography>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
          <Typography
            variant="caption"
            sx={{ display: "block", marginTop: 3, color: "#888" }}
          >
            By signing in, you agree to our terms and privacy policy.
          </Typography>
        </Paper>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
