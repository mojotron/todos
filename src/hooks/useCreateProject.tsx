import { useCallback, useState } from "react";
import { InputFieldsErrorType } from "./useSignup";
import { useTasks } from "./useTasks";
import { AxiosError } from "axios";

export const useCreateProject = () => {
  const { createProject, editProject } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | InputFieldsErrorType>(null);

  const addProject = useCallback(
    async (projectName: string) => {
      setLoading(true);
      setError(null);
      try {
        await createProject(projectName);
      } catch (error) {
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

  const updateProject = useCallback(
    async (projectId: string, newProjectName: string) => {
      setLoading(true);
      setError(null);
      try {
        await editProject(projectId, newProjectName);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error?.response?.data?.status === "error") {
            setError(error.response.data);
          }
        } else {
          setError({
            errorName: "input-error",
            errorMessage: "something went wrong",
            inputFieldsErrors: { projectName: "could not update project name" },
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [editProject]
  );

  return { loading, error, addProject, updateProject };
};
