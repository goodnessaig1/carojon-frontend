"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { ApolloError, ApolloQueryResult, useQuery } from "@apollo/client";
import { GET_ORDERS_BY_USER } from "../graphpl/queries";

interface User {
  email: string;
  fullname: string;
  id: string;
  userType: "client" | "biz_manager";
}

interface Order {
  id: number;
  userId: number;
  giftCardId: number;
  giftCard: {
    id: number;
    title: string;
    amount: string;
    image: string;
    isActive: boolean;
  };
}

interface GetOrdersData {
  getOrdersByUser: Order[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loadingOrders: boolean;
  ordersError?: ApolloError;
  orders?: GetOrdersData;
  refetchOrder: () => Promise<ApolloQueryResult<GetOrdersData>>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap around the app
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const storedUserData = localStorage.getItem("user");

    if (storedUserData && storedUserData !== "undefined") {
      try {
        const data = JSON.parse(storedUserData);
        return data?.user;
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null; // Fallback to null in case of JSON parse failure
      }
    }
    return null;
  });

  const userId = user?.id;
  const {
    loading: loadingOrders,
    error: ordersError,
    data: orders,
    refetch: refetchOrder,
  } = useQuery(GET_ORDERS_BY_USER, {
    variables: { userId: userId ? parseInt(userId) : undefined },
    skip: !userId,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadingOrders,
        ordersError,
        orders,
        refetchOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
