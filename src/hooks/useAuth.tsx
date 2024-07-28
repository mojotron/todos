import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("AuthContext must be used inside AuthContextProvider");

  return context;
};
