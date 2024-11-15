import { HandleDeactivateType } from "@/app/my-business/MyBusiness";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export interface GiftCard {
  id: string;
  title: string;
  amount: number;
  image: string;
  isActive: boolean;
}

interface GiftCardProps {
  giftcard: GiftCard;
  index: number;
  client: boolean;
  setGiftcardData?: React.Dispatch<
    React.SetStateAction<GiftCard | Record<string, any>>
  >;
  handleOpen?: () => void;
  handleDeactivate?: HandleDeactivateType;
  isOwner?: boolean;
  isDeactivating?: boolean;
}

export const GiftCardComponent: React.FC<GiftCardProps> = ({
  giftcard,
  client,
  setGiftcardData,
  handleOpen,
  isOwner,
  handleDeactivate,
}) => {
  const handlePayment = (data: GiftCard) => {
    if (setGiftcardData) {
      setGiftcardData(data);
    }
    if (handleOpen) {
      handleOpen();
    }
  };
  return (
    <Card sx={{ width: 280, maxWidth: 280, marginBottom: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={giftcard.image}
        alt={giftcard.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {giftcard.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amount: #{giftcard.amount}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            color={giftcard.isActive ? "primary" : "text.secondary"}
          >
            Status: {giftcard.isActive ? "Active" : "Inactive"}
          </Typography>
          {isOwner && giftcard.isActive && (
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  if (handleDeactivate) {
                    handleDeactivate(giftcard.id);
                  }
                }}
                sx={{
                  mt: 1,
                  background: giftcard.isActive ? "#10141F" : "gray",
                  borderRadius: "8px",
                  border: "1px #fff solid",
                  width: 120,
                }}
              >
                Deactivate
              </Button>
            </Box>
          )}
        </Box>
        {client && (
          <Button
            variant="contained"
            onClick={() => {
              if (giftcard.isActive) {
                handlePayment(giftcard);
              }
            }}
            sx={{
              mt: 1,
              background: giftcard.isActive ? "#10141F" : "gray",
              borderRadius: "8px",
              border: "1px #fff solid",
              width: 180,
            }}
          >
            {giftcard.isActive ? "Buy Now" : "Not available"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
