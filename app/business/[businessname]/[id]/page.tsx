"use client";
import React from "react";
import BusinessPage from "./BusinessPage";
import { useParams } from "next/navigation";

const page: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <BusinessPage userId={id} />;
};

export default page;
