"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const client = useAuth();

  useEffect(() => {
    router.push(`/client/${client?.id}/post`);
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
