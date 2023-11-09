import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]); // Store multiple URLs
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShortenUrl = async () => {
    setError(""); // Clear any previous errors
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://sanjaikannan-urlshortner.onrender.com/url/short",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ full: originalUrl }), // Ensure "full" is provided
        }
      );

      if (response.ok) {
        const data = await response.json();
        setShortUrls([...shortUrls, data.short]); // Append the new URL to the existing array
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while shortening the URL.");
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
        URL Shortener Application
      </Typography>
      <br />
      <br />
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
        <TextField
          label="Original URL"
          variant="outlined"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" onClick={handleShortenUrl}>
          Shorten
        </Button>
      </Grid>
      <br />
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
        {shortUrls.map((url, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ borderRadius: 0 }}>
            <Card elevation={20}>
              <CardContent>
                <Typography variant="subtitle1">
                  Shortened URL: <a href={url}>{url}</a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {error && <Typography color="error">{error}</Typography>}
    </Base>
  );
};

export default Home;
