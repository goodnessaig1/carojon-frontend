"use client";
import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { TiBusinessCard } from "react-icons/ti";

const Header: React.FC = () => {
  const { user, orders, setUser } = useAuth();
  const router = useRouter();
  const handleOrders = () => {
    router.push("/orders");
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/sign-in");
  };
  return (
    <AppBar
      sx={{
        backgroundColor: "#10141F",
        display: "flex",
        flexDirection: "row",
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingY: 2,
          marginX: {
            xs: "16px",
            lg: "80px",
          },
        }}
      >
        <Link href={"/"}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#fff", cursor: "pointer" }}
          >
            CAROJON
          </Typography>
        </Link>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          {user && user ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: { xs: 1, lg: 3 },
              }}
            >
              <Link href={"/dashboard"}>
                <Box
                  sx={{
                    color: "white",
                    textAlign: "center",
                    display: { xs: "block", lg: "none" },
                  }}
                >
                  <RiDashboardFill color="white" />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    display: { xs: "none", lg: "block" },
                  }}
                >
                  Dashboard
                </Typography>
              </Link>
              {user?.userType === "biz_manager" && (
                <Link href={"/my-business"}>
                  <Box
                    sx={{
                      color: "white",
                      textAlign: "center",
                      display: { xs: "block", lg: "none" },
                    }}
                  >
                    <TiBusinessCard color="white" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      textAlign: "center",
                      display: { xs: "none", lg: "block" },
                    }}
                  >
                    My Business
                  </Typography>
                </Link>
              )}

              <Box
                sx={{
                  borderRadius: "100%",
                  width: 34,
                  height: 34,
                  bgcolor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "black", textAlign: "center" }}
                >
                  {user?.fullname.charAt(0)}
                </Typography>
              </Box>
              <Box onClick={handleOrders}>
                <Box
                  sx={{
                    position: "absolute",
                    height: 18,
                    width: 19,
                    borderRadius: 100,
                    bgcolor: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    justifyItems: "center",
                    ml: 2,
                    mt: "-4px",
                    "&:hover": {
                      cursor: "pointer",
                      transition: "ease-in",
                      transitionDuration: "200ms",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "white", textAlign: "center", fontSize: 12 }}
                  >
                    {orders?.getOrdersByUser?.length}
                  </Typography>
                </Box>
                <TiShoppingCart size={26} color="white" />
              </Box>
              <Box
                onClick={handleLogout}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 0.5,
                  ml: 1,
                  "&:hover": {
                    cursor: "pointer",
                    transition: "ease-in",
                    transitionDuration: "200ms",
                    color: "lightgray",
                  },
                }}
              >
                <IoIosLogOut size={24} />
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", lg: "block" } }}
                >
                  Sign Out
                </Typography>
              </Box>
            </Box>
          ) : (
            <Link
              href={"/sign-in"}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Sign In</Typography>
            </Link>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
