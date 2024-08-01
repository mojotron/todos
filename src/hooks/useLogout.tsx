import { useCallback } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useLogout = () => {
  const { updateAuth } = useAuth();

  const logoutUser = useCallback(() => {
    console.log("logging out");

    axios
      .delete("/auth/logout")
      .then((response) => {
        if (response.data.status === "success") {
          updateAuth(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [updateAuth]);

  return { logoutUser };
};
