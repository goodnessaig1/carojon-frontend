import React from "react";
import Header from "../component/common/Header";
import { Box, Button, Typography } from "@mui/material";
import { GiftcardImage } from "../component/Utils/Assets";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        gap: 3,
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginX: {
            xs: "16px",
            lg: "80px",
          },
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: {
              sx: 3,
              lg: 2,
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "700",
              fontSize: {
                sx: "26px",
                lg: "52px",
              },
              color: "#10141F",
            }}
          >
            Shopping Made Easy with CAROJON
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Trade your giftcards easily with us, we are fast and reliable.
          </Typography>
          <Link href="/sign-in" passHref>
            <Button
              variant="contained"
              sx={{ background: "#10141F" }}
              color="primary"
            >
              Get Started
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={GiftcardImage}
            alt="Placeholder"
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              maxHeight: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
