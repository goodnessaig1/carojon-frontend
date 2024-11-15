"use client";
import React from "react";
import BusinessPage from "./BusinessPage";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { id } = useParams() as { id: string };

  return <BusinessPage userId={id} />;
};

export default Page;
