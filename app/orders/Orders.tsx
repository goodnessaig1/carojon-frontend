"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../component/common/Header";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "../component/Utils/Loading";
import Image from "next/image";
import { Empty } from "../component/Utils/Assets";

const Orders = () => {
  const { loadingOrders, orders } = useAuth();
  return (
    <Box>
      <Header />
      <Box sx={{ width: "100vw", minHeight: "100vh" }}>
        {!loadingOrders ? (
          <Box
            sx={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              px: {
                xs: "16px",
                lg: "80px",
              },
              pt: 12,
              minHeight: "100vh",
              gap: 4,
            }}
          >
            <Typography variant="h3" component="div">
              My orders
            </Typography>
            {orders && orders.getOrdersByUser?.length > 0 ? (
              <Container>
                <Box sx={{}}>
                  <>
                    {orders &&
                      orders?.getOrdersByUser.map((giftcard, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <Card
                            sx={{ width: 280, maxWidth: 280, marginBottom: 2 }}
                          >
                            <CardMedia
                              component="img"
                              height="140"
                              image={giftcard.giftCard.image}
                              alt={giftcard.giftCard.title}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {giftcard.giftCard.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Amount: #{giftcard.giftCard.amount}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </>
                </Box>
              </Container>
            ) : (
              <Box
                sx={{
                  height: "70vh",
                  width: "100vw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Image src={Empty} alt="empty" />
                <Typography variant="body2" color="text.secondary">
                  You have no orders
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </Box>
  );
};

export default Orders;
