import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const loginUser = useCallback(
    async (data: LoginFormDataType) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post("/auth/login", { ...data });
        if (response.data.status === "success") {
          setLoading(false);
          navigate("/");
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
    [navigate]
  );

  return { error, loading, loginUser };
};
