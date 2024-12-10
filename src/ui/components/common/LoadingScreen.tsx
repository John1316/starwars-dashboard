import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-full gap-2 ">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--lightsaber-blue)] border-t-transparent"></div>
      <span>Loading...</span>
    </div>
  );
}
