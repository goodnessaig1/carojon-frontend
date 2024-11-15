"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputBase,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CREATE_USER } from "../graphpl/mutations";
import { ApolloError, useMutation } from "@apollo/client";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormData {
  [key: string]: string;
}

const SignUp = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("client");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullname: "",
    businessName: "",
    businessDescription: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserType(e.target.value);

    if (e.target.value === "client") {
      setFormData((prevData: Record<string, string>) => ({
        ...prevData,
        businessName: "",
        businessDescription: "",
      }));
    }
  };

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
            fullname: formData.fullname,
            userType: userType,
            businessName:
              userType === "biz_manager" ? formData.businessName : undefined,
            businessDescription:
              userType === "biz_manager"
                ? formData.businessDescription
                : undefined,
          },
        },
      });
      router.push("/sign-in");
      toast.success("Account created successfully");
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.message;
        if (message.includes("Email already exists")) {
          setEmailError(message);
        }
      } else {
        console.log(error);
        toast.error("an error occured");
      }
    }
  };
  return (
    <Box
      sx={{
        backgroundSize: "contain",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        p={4}
        sx={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "12px",
          border: "1.5px #10141F solid",
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center" }}
          mb={3}
          fontSize="24px"
        >
          Sign Up
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1px" }}
          onSubmit={submitHandle}
        >
          <Box
            sx={{ mb: 1, display: "flex", flexDirection: "column", gap: "2px" }}
          >
            <InputBase
              required
              placeholder="Email address"
              type="email"
              name="email"
              fullWidth
              sx={{
                padding: "4px 10px",
                background: "#fff",
                fontSize: "15px",
                border: "1px solid #7373734D",
                borderRadius: "12px",
              }}
              value={formData.email}
              onChange={e => {
                setEmailError(null);
                handleChange(e);
              }}
            />
            {emailError && (
              <Typography fontSize="12px" color="red" sx={{ px: "10px" }}>
                {emailError}
              </Typography>
            )}
          </Box>

          <InputBase
            required
            placeholder="Full Name"
            type="text"
            name="fullname"
            fullWidth
            sx={{
              padding: "4px 10px",
              background: "#fff",
              fontSize: "15px",
              border: "1px solid #7373734D",
              borderRadius: "12px",
              mb: 1,
            }}
            value={formData.fullname}
            onChange={handleChange}
          />

          <InputBase
            required
            placeholder="Password"
            type="password"
            fullWidth
            name="password"
            sx={{
              padding: "4px 10px",
              background: "#fff",
              fontSize: "15px",
              border: "1px solid #7373734D",
              borderRadius: "12px",
              mb: 1,
            }}
            value={formData.password}
            onChange={handleChange}
          />

          <FormControl
            component="fieldset"
            sx={{ color: "black", mb: "4px", paddingX: "4px" }}
          >
            <FormLabel
              component="legend"
              sx={{ color: "#1976d2", fontSize: "16px" }}
            >
              User Type
            </FormLabel>
            <RadioGroup
              aria-label="userType"
              name="userType"
              value={userType}
              sx={{
                display: "flex",
                gap: 1,
                mx: "10px",
              }}
              onChange={handleUserTypeChange}
              row
            >
              <FormControlLabel
                value="client"
                control={
                  <Radio
                    sx={{
                      mr: "4px",
                      "&.MuiRadio-root": {
                        width: "0.8rem",
                        height: "1rem",
                      },
                    }}
                  />
                }
                label={<span style={{ fontSize: "0.8rem" }}>Client</span>}
                sx={{ color: "black" }}
              />
              <FormControlLabel
                value="biz_manager"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        width: "0.8rem",
                        height: "1rem",
                      },
                      mr: "4px",
                    }}
                  />
                }
                label={
                  <span style={{ fontSize: "0.8rem" }}>Business Manager</span>
                }
                sx={{ color: "black" }}
              />
            </RadioGroup>
          </FormControl>

          {userType === "biz_manager" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                mt: 1,
              }}
            >
              <InputBase
                required
                placeholder="Business Name"
                type="businessName"
                fullWidth
                name="businessName"
                sx={{
                  mt: 1,
                  padding: "4px 10px",
                  background: "#fff",
                  fontSize: "15px",
                  border: "1px solid #7373734D",
                  borderRadius: "12px",
                }}
                value={formData.businessName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Business Description"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                required
                multiline
                rows={2}
                sx={{
                  background: "#fff",
                  fontSize: "15px",
                  borderRadius: "12px",
                }}
              />
            </Box>
          )}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />

          {!loading ? (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                height: "44px",
                background: "#10141F",
                borderRadius: "12px",
              }}
              type="submit"
            >
              Sign Up
            </Button>
          ) : (
            <Box
              sx={{
                mt: 2,
                width: "100%",
                height: "44px",
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
          <Box>
            <Typography fontWeight={300} mt={1}>
              <Link href="/sign-in" underline="hover" sx={{ color: "black" }}>
                Already have an account? Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
