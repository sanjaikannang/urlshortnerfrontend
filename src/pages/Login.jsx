import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
Box;
import Base from "../Base/Base";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    setError(""); // Clear the error message on component load
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Send a POST request to your login API endpoint
    try {
      const response = await fetch(
        "https://sanjaikannan-urlshortner.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Login successful, save the token in local storage
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message); // Set the error message received from the server
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login.");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the forgot password page
    navigate("/forgotpassword");
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
        Login
      </Typography>
      <br />
      <form onSubmit={handleLogin}>
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
          <Grid item xs={10}>
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={handleChange}
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
            Log In
          </Button>
        </Grid>
      </form>
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
        <Button variant="text" color="primary" onClick={handleForgotPassword}>
          Forgot password?
        </Button>
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
    </Base>
  );
};

export default Login;
