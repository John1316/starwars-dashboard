"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import ErrorPage from "@/ui/components/common/Error/ErrorPage";
import React from "react";

export default function error({ error }: any) {
  return (
    <DashboardLayout>
      <div className="h-full w-full">
        <ErrorPage text1={"Something's missing."} text2={error.message} />
      </div>
    </DashboardLayout>
  );
}
