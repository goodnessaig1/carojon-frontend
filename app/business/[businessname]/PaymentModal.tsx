import { CREATE_PAYMENT } from "@/app/graphpl/mutations";
import { ApolloError, useMutation } from "@apollo/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
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
export const PaymentModal = ({ open, handleClose, giftcard, refetch }: any) => {
  const { user, refetchOrder } = useAuth();
  let userId = user?.id;
  let giftCardId = giftcard?.id;

  const [createPayment, { loading }] = useMutation(CREATE_PAYMENT);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const input = {
      userId: userId ? parseInt(userId) : undefined,
      giftCardId: giftCardId ? parseInt(giftCardId) : undefined,
    };
    try {
      await createPayment({
        variables: {
          input,
        },
      });
      refetch();
      refetchOrder();
      handleClose();
      toast.success("Successfully purchased giftcard");
    } catch (error: any) {
      const message = error.message;
      if (error instanceof ApolloError) {
      } else {
        console.log(message);
      }
      toast.error(message);
      console.error("Error creating gift card:", message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="h6" component="div">
              Title: {giftcard?.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="h6" component="div">
              Price: #{giftcard?.amount}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              width: "100%",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                minHeight: "140px",
                marginBottom: 2,
                borderRadius: "8px",
              }}
              width={266}
              height={100}
              src={giftcard?.image}
              alt=""
            />
          </Box>

          {!loading ? (
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                background: "#10141F",
                borderRadius: "8px",
                border: "1px #fff solid",
              }}
            >
              Make Payment
            </Button>
          ) : (
            <Box
              sx={{
                mt: 2,
                width: "100%",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
