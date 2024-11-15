"use client";
import { Unavailable } from "@/app/component/Utils/Assets";
import LoadingPage from "@/app/component/Utils/Loading";
import Header from "@/app/component/common/Header";
import { GET_USER_WITH_BUSINESS } from "@/app/graphpl/queries";
import { useQuery } from "@apollo/client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Modal } from "@mui/material";
import { CreateGiftCardModal } from "../CreateGiftcardModal";
import { CreateServiceModal } from "../CreateServiceModal";
import Services from "../Services";
import GiftCards from "../GiftCards";
import { useAuth } from "@/app/context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

const BusinessPage = ({ userId }: any) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isActive, setIsActive] = useState("giftcard");
  const [open, setOpen] = useState(false);
  const [openCreateGiftcard, setOpenCreateGiftcard] = useState(false);
  const [openCreateService, setOpenCreateService] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCreateGiftcard = () => setOpenCreateGiftcard(true);
  const closeCreateGiftcard = () => setOpenCreateGiftcard(false);

  const handleOpenCreateService = () => setOpenCreateService(true);
  const closeCreateService = () => setOpenCreateService(false);

  const { data, loading: queryLoading } = useQuery(GET_USER_WITH_BUSINESS, {
    variables: { userId: userId ? parseInt(userId) : undefined },
    skip: !userId,
  });

  let userDetails = data?.userWithBusiness;
  let businessId = data?.userWithBusiness?.business?.id;

  useEffect(() => {
    if (!queryLoading) {
      setLoading(false);
    }
  }, [queryLoading]);

  return (
    <Box sx={{ p: 0, px: 0, paddingX: 0 }}>
      <Header />
      {!loading ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: {
              xs: "16px",
              lg: "80px",
            },
            mt: 16,
            mb: 12,
            mx: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "200px",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "600px",
                  mt: 2,
                }}
              >
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
                  <Typography variant="body2" color="text.secondary">
                    {userDetails?.fullname}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {userDetails?.email}
                </Typography>
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
                  <Typography variant="body2" color="text.secondary">
                    {userDetails?.business.name}
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
                    Business Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userDetails?.business.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setIsActive("services")}
                sx={{
                  mt: 2,
                  background: isActive == "services" ? "#10141F" : "lightgray",
                  borderRadius: "8px",
                  border: "1px #fff solid",
                  color: isActive == "services" ? "white" : "black",
                }}
              >
                View Services
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsActive("giftcard")}
                sx={{
                  mt: 2,
                  background: isActive == "giftcard" ? "#10141F" : "lightgray",
                  borderRadius: "8px",
                  border: "1px #fff solid",
                  color: isActive == "giftcard" ? "" : "black",
                }}
              >
                View Giftcards
              </Button>
            </Box>
            {/*  */}
            {isActive === "services" && (
              <Services businessId={userDetails?.business?.id} />
            )}
            {isActive === "giftcard" && (
              <GiftCards businessId={userDetails?.business?.id} />
            )}
          </Box>
          {/* {user?.id === userId && (
            <Box>
              <Box
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    transition: "ease-in",
                    transitionDuration: "200",
                  },
                }}
                onClick={handleOpen}
              >
                <HiOutlineDotsVertical size={26} />
              </Box>
              <CreateGiftCardModal
                open={openCreateGiftcard}
                handleClose={closeCreateGiftcard}
                businessId={userDetails?.business?.id}
              />

              <CreateServiceModal
                open={openCreateService}
                handleClose={closeCreateService}
                businessId={userDetails?.business?.id}
              />
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Box
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        transition: "ease-in",
                        transitionDuration: "200ms",
                      },
                      p: 2,
                      borderRadius: 1,
                    }}
                    onClick={handleOpenCreateGiftcard}
                  >
                    <Typography variant="h6" component="h2" gutterBottom>
                      Add Giftcard
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        transition: "ease-in",
                        transitionDuration: "200ms",
                      },
                      p: 2,
                      borderRadius: 1,
                    }}
                    onClick={handleOpenCreateService}
                  >
                    <Typography variant="h6" component="h2" gutterBottom>
                      Add Service
                    </Typography>
                  </Box>
                </Box>
              </Modal>
            </Box>
          )} */}
        </Container>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default BusinessPage;
