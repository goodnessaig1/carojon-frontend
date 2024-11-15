"use client";
import { GET_SERVICES_BY_BUSINESS_ID } from "@/app/graphpl/queries";
import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

interface Props {
  businessId: string;
}
interface Service {
  id: number;
  name: string;
  description: number;
  price: string;
}

const Services = ({ businessId }: Props) => {
  const { loading, error, data } = useQuery(GET_SERVICES_BY_BUSINESS_ID, {
    variables: {
      businessId: businessId ? parseInt(businessId) : undefined,
    },
    skip: !businessId,
  });
  let services: Service[] = data?.getServicesByBusinessId;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography sx={{ mt: 3 }} variant="h4" component="h2" gutterBottom>
        Services
      </Typography>
      {services?.length > 0 ? (
        <>
          {data && (
            <Grid
              container
              spacing={2}
              justifyContent=""
              direction="column"
              maxWidth="700px"
              sx={{ width: "100%" }}
            >
              {services &&
                services.map(service => (
                  <Grid
                    item
                    xs={12}
                    direction="column"
                    sm={6}
                    md={4}
                    key={service.id}
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
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontSize: 24, fontWeight: "600" }}
                          color="text.secondary"
                        >
                          {service.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Price: #{service.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </>
      ) : (
        <Box
          sx={{
            p: 0,
            width: "100vw",
            height: "50vh",
            display: "flex",
            mt: 8,
            justifyContent: "center",
            ml: "-80px",
          }}
        >
          <Typography
            sx={{ fontSize: 24 }}
            variant="body2"
            color="text.secondary"
          >
            No services available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Services;
