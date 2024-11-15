import { GET_GIFT_CARDS_BY_BUSINESS_ID } from "@/app/graphpl/queries";
import { useQuery } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { GiftCard, GiftCardComponent } from "./GiftCard";
import { PaymentModal } from "./PaymentModal";

interface Props {
  businessId: string;
}

const GiftCards = ({ businessId }: Props) => {
  // const [giftcardData, setGiftcardData] = useState<GiftCard | {}>({});
  const [giftcardData, setGiftcardData] = useState<
    GiftCard | Record<string, never>
  >({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, refetch } = useQuery(GET_GIFT_CARDS_BY_BUSINESS_ID, {
    variables: {
      businessId: businessId ? parseInt(businessId) : undefined,
    },
    skip: !businessId,
  });
  const giftcards: GiftCard[] = data?.getGiftCardsByBusinessId;
  const handleRefetch = () => {
    refetch();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography sx={{ mt: 3 }} variant="h4" component="h2" gutterBottom>
        Giftcards
      </Typography>

      <PaymentModal
        open={open}
        handleClose={handleClose}
        businessId={businessId}
        giftcard={giftcardData}
        handleRefetch={handleRefetch}
      />
      {giftcards?.length > 0 ? (
        <Grid container spacing={2}>
          {giftcards &&
            giftcards.map((giftcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={giftcard.id}>
                <GiftCardComponent
                  giftcard={giftcard}
                  index={index}
                  client={true}
                  setGiftcardData={setGiftcardData}
                  handleOpen={handleOpen}
                />
              </Grid>
            ))}
        </Grid>
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
            No giftcards available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GiftCards;
