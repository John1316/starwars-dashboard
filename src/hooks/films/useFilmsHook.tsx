import { FilmsContext } from "@/context/FilmsContext";
import { useContext } from "react";

// Custom hook to use the context
export function useFilmsHook() {
    const context = useContext(FilmsContext);
    if (context === undefined) {
      throw new Error('useStarWars must be used within a StarWarsProvider');
    }
    return context;
  }