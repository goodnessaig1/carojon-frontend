"use client";
import React from "react";
import BusinessPage from "./BusinessPage";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();

  return <BusinessPage userId={params?.id} />;
};

export default page;
