"use client";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import apolloClient from "./lib/apollioClient";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

const AppContainer = ({ children }: any) => {
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
