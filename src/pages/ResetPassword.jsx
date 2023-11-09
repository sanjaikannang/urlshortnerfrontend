import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Base from "../Base/Base";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes and update newPassword state
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    // Send a POST request to the reset password API endpoint
    try {
      const response = await fetch(
        `https://sanjaikannan-urlshortner.onrender.com/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }), // Make sure to include newPassword
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Password updated successfully
        setMessage(data.message);
      } else {
        setError(data.message);
        setMessage(""); // Clear the success message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating your password.");
      setMessage(""); // Clear the success message
    }
  };

  return (
    <Base>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        Reset Password
      </Typography>
      <br />
      <form onSubmit={handleResetPassword}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              required
              value={newPassword}
              onChange={handleNewPasswordChange} // Handle input changes
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Grid>
        </Grid>
        <br />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="primary">{message}</Typography>}
        </Grid>
      </form>
    </Base>
  );
};

export default ResetPassword;
