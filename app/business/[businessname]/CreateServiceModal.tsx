import { CREATE_SERVICE } from "@/app/graphpl/mutations";
import { ApolloError, useMutation } from "@apollo/client";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { CreateProps } from "./CreateGiftcardModal";

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
export const CreateServiceModal = ({
  open,
  handleClose,
  businessId,
}: CreateProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [createService, { loading }] = useMutation(CREATE_SERVICE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = {
      price: price ? parseInt(price) : undefined,
      businessId,
      name,
      description,
    };
    try {
      const create = await createService({
        variables: {
          input,
        },
      });
      if (handleClose) {
        handleClose();
      }
      toast.success("Successfully created");
      console.log(" Service created successfully", create);
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.message;
        toast.error(message);
      } else if (error instanceof Error) {
        const message = error.message;
        console.log(message);
        toast.error(message);
      } else {
        console.error("An unknown error occurred:", error);
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Create Service
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />

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
              Create Service
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
