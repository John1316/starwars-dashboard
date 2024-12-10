import { StarshipsContext } from "@/context/StarshipsContext";
import { useContext } from "react";

// Custom hook to use the context
export function useStarshipsHook() {
    const context = useContext(StarshipsContext);
    if (context === undefined) {
      throw new Error('StarshipsContext must be used within a StarshipsContext');
    }
    return context;
  }