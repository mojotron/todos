import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "./useAuth";

export type LoginErrorType = {
  errorMessage: string;
};

type LoginFormDataType = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const [error, setError] = useState<null | LoginErrorType>(null);
  const [loading, setLoading] = useState(false);
  const { updateAuth } = useAuth();

  const loginUser = useCallback(
    async (data: LoginFormDataType) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post("/auth/login", { ...data });
        if (response.data.status === "success") {
          setLoading(false);
          updateAuth(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const customError = error?.response?.data;
          setError({
            errorMessage: customError.message,
          });
        }
        setLoading(false);
      }
    },
    [updateAuth]
  );

  return { error, loading, loginUser };
};
