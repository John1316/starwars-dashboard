import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full gap-2 ">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--rebel-yellow)] border-t-transparent"></div>
      <span className="text-white">Loading...</span>
    </div>
  );
}
