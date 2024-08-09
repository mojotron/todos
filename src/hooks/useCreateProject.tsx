import { useCallback, useState } from "react";
import { InputFieldsErrorType } from "./useSignup";
import { useTasks } from "./useTasks";
import { AxiosError } from "axios";

export const useCreateProject = () => {
  const { createProject } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | InputFieldsErrorType>(null);

  const addProject = useCallback(
    async (projectName: string) => {
      console.log("new hook");

      setLoading(true);
      setError(null);
      try {
        await createProject(projectName);
      } catch (error) {
        console.log("i cought error");

        if (error instanceof AxiosError) {
          if (error?.response?.data?.status === "error") {
            setError(error.response.data);
          }
        } else {
          setError({
            errorName: "input-error",
            errorMessage: "something went wrong",
            inputFieldsErrors: { projectName: "could not create project" },
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [createProject]
  );

  return { loading, error, addProject };
};
