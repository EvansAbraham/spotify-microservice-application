import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { UserContextType } from "../context/UserContext";

export const useUserData = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
  };