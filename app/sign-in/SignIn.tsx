"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphpl/mutations";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignIn = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, loading }] = useMutation(LOGIN_USER);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });
      const data = response.data.loginUser?.user;
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.message;
        if (message.includes("User does not exist")) {
          setEmailError(message);
        }
        if (message.includes("Incorrect password")) {
          setPasswordError(message);
        }
        console.log(message);
      } else {
        toast.error("An error occured");
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
        color: "#fff",
      }}
    >
      <Box
        p={4}
        sx={{
          width: "100%",
          background: "#10141F",
          maxWidth: "380px",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center" }}
          mb={3}
          fontSize="24px"
        >
          Sign In
        </Typography>
        <Box component="form" sx={{ color: "#fff" }} onSubmit={submitHandle}>
          <Box
            sx={{ mb: 2, display: "flex", flexDirection: "column", gap: "2px" }}
          >
            <InputBase
              required
              placeholder="Email address"
              type="email"
              fullWidth
              sx={{
                padding: "5px 10px",
                background: "#fff",
                fontSize: "15px",
              }}
              value={email}
              onChange={e => {
                setEmailError(null);
                setEmail(e.target.value);
              }}
            />
            {emailError && (
              <Typography fontSize="12px">{emailError}</Typography>
            )}
          </Box>
          <Box
            sx={{ mb: 1, display: "flex", flexDirection: "column", gap: "2px" }}
          >
            <InputBase
              required
              placeholder="Password"
              type="password"
              fullWidth
              sx={{
                padding: "5px 10px",
                background: "#fff",
                fontSize: "15px",
              }}
              value={password}
              onChange={e => {
                setPasswordError(null);
                setPassword(e.target.value);
              }}
            />
            {passwordError && (
              <Typography fontSize="12px">{passwordError}</Typography>
            )}
          </Box>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ color: "#fff" }}
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
              Sign In
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
          <Box>
            <Typography fontWeight={300} mt={2}>
              <Link href="sign-up" underline="hover" sx={{ color: "#fff" }}>
                Don't have an account ? Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
