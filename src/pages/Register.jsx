import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Base from "../Base/Base";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSaveToken = (token) => {
    // Save the token in local storage
    localStorage.setItem("token", token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your API endpoint
    try {
      const response = await fetch(
        "https://sanjaikannan-urlshortner.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Registration successful, parse the response for the token
        const data = await response.json();
        const token = data.token;

        // Save the token in local storage
        handleSaveToken(token);

        // Navigate to the login page
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message); // Set the error message received from the server
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during registration.");
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
        Register
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
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
              name="name"
              label="Name"
              variant="outlined"
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
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
            Sign Up
          </Button>

          {error && <Typography color="error">{error}</Typography>}
        </Grid>
      </form>
    </Base>
  );
};

export default Register;
