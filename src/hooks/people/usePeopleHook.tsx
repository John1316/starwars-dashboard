import { PeopleContext } from "@/context/PeopleContext";
import { useContext } from "react";

// Custom hook to use the context
export function usePeopleHook() {
    const context = useContext(PeopleContext);
    if (context === undefined) {
      throw new Error('useStarWars must be used within a StarWarsProvider');
    }
    return context;
  }