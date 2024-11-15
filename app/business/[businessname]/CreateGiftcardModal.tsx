import { uploadFile } from "@/app/component/Utils/utils";
import { CREATE_GIFT_CARD } from "@/app/graphpl/mutations";
import { ApolloError, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { Oval, ThreeDots } from "react-loader-spinner";
import { GET_GIFT_CARDS_BY_BUSINESS_ID } from "@/app/graphpl/queries";

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
export const CreateGiftCardModal = ({ open, handleClose, businessId }: any) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);
  const [uploadImgLoading, setUploadImgLoading] = useState(false);

  const [createGiftCard, { loading }] = useMutation(CREATE_GIFT_CARD, {
    update(cache, { data: { createGiftCard } }) {
      const existingData: any = cache.readQuery({
        query: GET_GIFT_CARDS_BY_BUSINESS_ID,
        variables: { businessId: parseInt(businessId) },
      });

      // This is where adds the new giftcard to the previous giftcards array
      if (createGiftCard) {
        cache.writeQuery({
          query: GET_GIFT_CARDS_BY_BUSINESS_ID,
          variables: { businessId: parseInt(businessId) },
          data: {
            getGiftCardsByBusinessId: [
              createGiftCard,
              ...existingData.getGiftCardsByBusinessId,
            ],
          },
        });
      }
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const input = {
      title,
      amount: amount ? parseInt(amount) : undefined,
      businessId,
      image,
    };
    try {
      await createGiftCard({
        variables: {
          input,
        },
      });
      handleClose();
      toast.success("Successfully created");
    } catch (error: any) {
      const message = error.message;
      if (error instanceof ApolloError) {
        console.log(message);
      } else {
        const message = error.message;
        console.log(message);
      }
      toast.error(message);
      console.error("Error creating gift card:", error);
    }
  };

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      uploadImage(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadFile(formData, setUploadImgLoading);
      setImage(response.result);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("An error occured, please try again");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Create Gift Card
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />

          <Box
            sx={{
              mt: 2,
              width: "100%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!uploadImgLoading ? (
              <>
                {!image ? (
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed #cccccc",
                      borderRadius: 1,
                      padding: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      minHeight: "100px",
                      marginBottom: 2,
                      backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography>Drop the file here...</Typography>
                    ) : (
                      <Typography>
                        Drag and drop an image here, or click to select a file
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Box>
                    <Image
                      style={{
                        minHeight: "100px",
                        marginBottom: 2,
                        borderRadius: "8px",
                      }}
                      width={266}
                      height={100}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 0,
                        mr: 2,
                        p: "4px",
                        mt: "-10px",
                        bgcolor: "rgba(238, 238, 238, 1)",
                      }}
                      onClick={() => setImage(null)}
                    >
                      <IoMdClose size={18} />
                    </IconButton>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Oval
                  visible={true}
                  height="34"
                  width="34"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </Box>
            )}
          </Box>

          {!loading ? (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "#10141F",
                borderRadius: "8px",
                border: "1px #fff solid",
              }}
              type="submit"
            >
              Create Gift Card
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
                color="#10141F"
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
