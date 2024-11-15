"use client";
import { ApolloProvider } from "@apollo/client";
import React, { ReactNode } from "react";
import apolloClient from "./lib/apollioClient";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

interface AppContainerProps {
  children: ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ToastContainer />
        <div className="">{children}</div>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default AppContainer;
