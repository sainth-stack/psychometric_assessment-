import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { REACT_APP_GOOGLE_CLIENT_ID } from "../../utils/GoogleLogin";
import { ENDPOINT } from "../../utils/EndPoint";
import toast from "react-hot-toast";

const GoogleLoginComponent = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [autoLoggedIn, setAutoLoggedIn] = useState(false);

  // Auto-login for test candidates
  useEffect(() => {
    const candidateId = localStorage.getItem("candidateId");
    const token = localStorage.getItem("testToken");

    if (candidateId && token) {
      setLoading(true);
      axios
        .post(`${"https://test.talentspotifyapp.com"}/api/users/google-login`, {
          token,
        })
        .then((response) => {
          const userEmail = response?.data?.user?.email;
          if (userEmail) {
            localStorage.setItem("userEmail", userEmail);
          }

          toast.success("Auto-login successful!");
          if (onLogin) onLogin(response.data);
          setAutoLoggedIn(true);
          navigate("/"); // Go to test conditions page
        })
        .catch((error) => {
          console.error(
            "Auto-login failed:",
            error.response?.data || error.message
          );
          toast.error("Auto-login failed. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [navigate, onLogin]);

  // Manual Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const { credential } = credentialResponse;

      const response = await axios.post(
        `${"https://test.talentspotifyapp.com"}/api/users/google-login`,
        {
          token: credential,
        }
      );

      const userEmail = response?.data?.user?.email;
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
      }

      toast.success("Login successful!");
      if (onLogin) onLogin(response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error during Google login:",
        error.response?.data || error.message
      );
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google login failed");
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {!autoLoggedIn && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: { xs: 2, md: 0 },
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{ display: "block", marginTop: 3, color: "#888" }}
            >
              By signing in, you agree to our terms and privacy policy.
            </Typography>
          </Paper>
        </Box>
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
