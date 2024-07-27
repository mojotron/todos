import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export type InputFieldsErrorType = {
  errorName: string;
  errorMessage: string;
  inputFieldsErrors: { [key: string]: string };
};

type SignupFormDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignup = () => {
  const [error, setError] = useState<null | InputFieldsErrorType>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupUser = useCallback(
    async (data: SignupFormDataType) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("/auth/signup", { ...data });
        if (response.data.status === "success") {
          setLoading(false);
          navigate("/login");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const customError = error?.response?.data;
          if (customError.errorName === "form-validation") {
            setError({
              errorName: customError.errorName,
              errorMessage: customError.message,
              inputFieldsErrors: customError.inputFieldsErrors,
            });
          } else {
            setError({
              errorName: error.message,
              errorMessage: error.message,
              inputFieldsErrors: {},
            });
          }
          setLoading(false);
        }
      }
    },
    [navigate]
  );

  return { loading, error, signupUser };
};
