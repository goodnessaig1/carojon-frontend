"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
// import movieBg from "../../assets/movie-bg1.jpg";
import { useState } from "react";
import Header from "./component/common/Header";
import HomePage from "./LandingPage/HomePage";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandle = (e: any) => {
    e.preventDefault();
    console.log(`Email : ${email} and Password : ${password}`);
    setEmail("");
    setPassword("");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        // color: "white",
        // padding: 3,
      }}
    >
      <HomePage />
    </Box>
  );
};

export default Home;
