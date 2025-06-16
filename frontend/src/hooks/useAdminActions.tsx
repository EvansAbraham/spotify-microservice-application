import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import type { AdminContextType } from "../context/AdminContext";

export const useAdminActions = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminActions must be used within an AdminProvider");
  }
  return context;
};
