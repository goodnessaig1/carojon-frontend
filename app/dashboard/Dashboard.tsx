"use client";
import React from "react";
import Header from "../component/common/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { GET_USERS_WITH_BUSINESS_DETAILS } from "../graphpl/queries";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Unavailable from "../../app/assets/unavailable.jpeg";
import Link from "next/link";
import LoadingPage from "../component/Utils/Loading";

const Dashboard = () => {
  const { data, loading } = useQuery(GET_USERS_WITH_BUSINESS_DETAILS);
  return (
    <Box>
      <Header />
      <Box sx={{ width: "100vw", minHeight: "100vh" }}>
        {!loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: {
                xs: "16px",
                lg: "80px",
              },
              backgroundColor: "#fff",
              minHeight: "100vh",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "black", cursor: "pointer", mt: 10 }}
            >
              Users with businesses
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {data && (
                <Grid
                  container
                  spacing={2}
                  justifyContent=""
                  direction="column"
                  marginTop={4}
                  maxWidth="700px"
                  sx={{ width: "100%" }}
                >
                  {data &&
                    data?.getBusinessManagers.map((item: any) => (
                      <Grid
                        item
                        xs={12}
                        direction="row"
                        sm={6}
                        md={4}
                        key={item.id}
                      >
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                            p: 1,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={Unavailable}
                            alt="Placeholder"
                            style={{
                              maxWidth: "90px",
                              width: "100%",
                              height: "100px",
                              maxHeight: "100%",
                            }}
                          />
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <Typography variant="h5" component="div">
                                FullName
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item?.fullname}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <Typography variant="h5" component="div">
                                Business Name
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item?.business.name}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                              }}
                            >
                              <Typography variant="h6" color="">
                                Business Description
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.business?.description}
                              </Typography>
                            </Box>
                            <Link
                              href={`/business/${item?.business?.name}/${item?.id}`}
                              passHref
                            >
                              <Button
                                variant="contained"
                                sx={{ background: "#10141F", mt: 1 }}
                                color="primary"
                              >
                                View Services
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
          </Box>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
