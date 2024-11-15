import { Box } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Oval
        visible={true}
        height="40"
        width="40"
        color="black"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
};

export default LoadingPage;
