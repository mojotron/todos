import { useCallback, useState } from "react";
import TaskType, { TaskAssignment } from "../types/taskType";

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addTask = useCallback(
    async (task: TaskType, assignment: TaskAssignment) => {
      try {
        setLoading(true);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, addTask };
};
