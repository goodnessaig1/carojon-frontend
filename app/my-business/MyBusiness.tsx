"use client";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../component/common/Header";
import { useAuth } from "../context/AuthContext";
import {
  GET_GIFT_CARDS_BY_BUSINESS_ID,
  GET_USER_WITH_BUSINESS,
} from "../graphpl/queries";
import { useMutation, useQuery } from "@apollo/client";
import LoadingPage from "../component/Utils/Loading";
import {
  GiftCard,
  GiftCardComponent,
} from "../business/[businessname]/GiftCard";
import Image from "next/image";
import { Empty } from "../component/Utils/Assets";
import { CreateGiftCardModal } from "../business/[businessname]/CreateGiftcardModal";
import { CreateServiceModal } from "../business/[businessname]/CreateServiceModal";
import { DEACTIVATE_GIFT_CARD } from "../graphpl/mutations";
import { HiOutlineDotsVertical } from "react-icons/hi";
export type HandleDeactivateType = (giftCardId: string) => Promise<void>;

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

const MyBusiness = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState("active");
  const [openCreateGiftcard, setOpenCreateGiftcard] = useState(false);
  const [openCreateService, setOpenCreateService] = useState(false);
  // const [giftcardData, setGiftcardData] = useState<GiftCard | {}>({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeCreateGiftcard = () => setOpenCreateGiftcard(false);

  const closeCreateService = () => setOpenCreateService(false);

  const userId = user?.id;

  const { data, error, loading } = useQuery(GET_USER_WITH_BUSINESS, {
    variables: { userId: userId ? parseInt(userId) : undefined },
    skip: !userId,
  });

  const businessId = data?.userWithBusiness?.business?.id;

  const handleOpenCreateGiftcard = () => {
    if (businessId) {
      setOpenCreateGiftcard(true);
    } else {
      alert("You have to sign in");
    }
  };

  const handleOpenCreateService = () => {
    if (businessId) {
      setOpenCreateService(true);
    } else {
      alert("You have to sign in");
    }
  };

  const { data: giftcardsData } = useQuery(GET_GIFT_CARDS_BY_BUSINESS_ID, {
    variables: {
      businessId: businessId ? parseInt(businessId) : undefined,
    },
    skip: !businessId,
    fetchPolicy: "cache-and-network",
  });

  const activeGiftCards: GiftCard[] =
    giftcardsData?.getGiftCardsByBusinessId.filter(
      (card: GiftCard) => card.isActive,
    ) || [];
  const deactivatedGiftCards: GiftCard[] =
    giftcardsData?.getGiftCardsByBusinessId.filter(
      (card: GiftCard) => !card.isActive,
    ) || [];

  const giftcards: GiftCard[] = giftcardsData?.getGiftCardsByBusinessId;

  const [deactivateGiftCard, { loading: isDeactivating }] =
    useMutation(DEACTIVATE_GIFT_CARD);

  const handleDeactivate: HandleDeactivateType = async giftCardId => {
    try {
      await deactivateGiftCard({ variables: { id: parseInt(giftCardId) } });
      console.log("Gift card deactivated successfully");
    } catch (err) {
      console.error("Failed to deactivate gift card:", err);
    }
  };

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
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box sx={{ width: "100vw", minHeight: "100vh", my: 16 }}>
        <CreateGiftCardModal
          open={openCreateGiftcard}
          handleClose={closeCreateGiftcard}
          businessId={businessId}
        />

        <CreateServiceModal
          open={openCreateService}
          handleClose={closeCreateService}
          businessId={businessId}
        />
        {!loading ? (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              px: {
                xs: "16px",
                lg: "80px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" component="div">
                My Giftcards
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleOpenCreateGiftcard}
                  sx={{
                    background: "#10141F",
                    borderRadius: "8px",
                    border: "1px #fff solid",
                  }}
                >
                  Create Giftcard
                </Button>
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
                    businessId={businessId}
                  />

                  <CreateServiceModal
                    open={openCreateService}
                    handleClose={closeCreateService}
                    businessId={businessId}
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
              </Box>
            </Box>
            {giftcards?.length > 0 ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setIsActive("active")}
                    sx={{
                      mt: 2,
                      background:
                        isActive == "active" ? "#10141F" : "lightgray",
                      borderRadius: "8px",
                      border: "1px #fff solid",
                      color: isActive == "active" ? "white" : "black",
                    }}
                  >
                    Active Giftcards
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setIsActive("deactivated")}
                    sx={{
                      mt: 2,
                      background:
                        isActive == "deactivated" ? "#10141F" : "lightgray",
                      borderRadius: "8px",
                      border: "1px #fff solid",
                      color: isActive == "deactivated" ? "" : "black",
                    }}
                  >
                    Deactivated Giftcards
                  </Button>
                </Box>
                <Box sx={{ mt: 6 }}>
                  {isActive === "active" ? (
                    <>
                      {activeGiftCards.length > 0 ? (
                        <Grid container spacing={2}>
                          {activeGiftCards &&
                            activeGiftCards.map((giftcard, index) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={giftcard.id}
                              >
                                <GiftCardComponent
                                  giftcard={giftcard}
                                  index={index}
                                  client={false}
                                  isOwner={
                                    userId === data?.userWithBusiness?.id
                                  }
                                  isDeactivating={isDeactivating}
                                  // setGiftcardData={setGiftcardData}
                                  handleDeactivate={handleDeactivate}
                                />
                              </Grid>
                            ))}
                        </Grid>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Image src={Empty} alt="empty-image" />
                          <Typography variant="h5" component="div">
                            No Active Giftcard
                          </Typography>
                        </Box>
                      )}
                    </>
                  ) : (
                    <>
                      {deactivatedGiftCards.length > 0 ? (
                        <Grid container spacing={2}>
                          {deactivatedGiftCards &&
                            deactivatedGiftCards.map((giftcard, index) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={giftcard.id}
                              >
                                <GiftCardComponent
                                  giftcard={giftcard}
                                  index={index}
                                  client={false}
                                  // setGiftcardData={setGiftcardData}
                                  isOwner={
                                    userId === data?.userWithBusiness?.id
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Image src={Empty} alt="empty-image" />
                          <Typography variant="h5" component="div">
                            No Giftcard
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  minHeight: 500,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Typography variant="h5" component="div">
                  Your GiftCards is empty
                </Typography>
                <Image src={Empty} alt="" width={200} height={250} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 12 }}
                    color="gray"
                    component="div"
                  >
                    Click here to create gift card
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleOpenCreateGiftcard}
                    sx={{
                      background: "#10141F",
                      borderRadius: "8px",
                      border: "1px #fff solid",
                      width: 180,
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
        ) : (
          <LoadingPage />
        )}
      </Box>
    </Box>
  );
};

export default MyBusiness;
