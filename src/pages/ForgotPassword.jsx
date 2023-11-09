import React, { useState } from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";
import Base from "../Base/Base";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Send a POST request to your forgot password API endpoint
    try {
      const response = await fetch(
        "https://sanjaikannan-urlshortner.onrender.com/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Email sent successfully
        setMessage(data.message);
      } else {
        // Handle various error cases
        setError(data.message);
        setMessage(""); // Clear the success message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
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
        Forgot Password
      </Typography>
      <br />
      <form onSubmit={handleForgotPassword}>
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
              label="Email"
              type="email"
              variant="outlined"
              required
              value={email}
              onChange={handleEmailChange}
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
            Send Email
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="primary">{message}</Typography>}
        </Grid>
      </form>
    </Base>
  );
};

export default ForgotPassword;
