import { Box } from "@mui/material";
import HomePage from "./LandingPage/HomePage";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
      }}
    >
      <HomePage />
    </Box>
  );
};

export default Home;
