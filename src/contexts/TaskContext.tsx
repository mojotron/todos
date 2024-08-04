import { ReactNode, createContext, useCallback, useReducer } from "react";
import type ProjectType from "../types/projectType";

type StateType = {
  tasks: [];
  projects: ProjectType[];
};
type ActionsType =
  | { type: "project/create"; payload: ProjectType }
  | { type: "project/delete"; payload: string }
  | {
      type: "project/edit";
      payload: { projectId: string; newProjectName: string };
    };

const taskReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case "project/create":
      return { ...state, projects: [...state.projects, action.payload] };
    case "project/delete":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case "project/edit":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload.projectId
            ? { ...project, projectName: action.payload.newProjectName }
            : project
        ),
      };
    default:
      return { ...state };
  }
};

const useTaskSource = (): {
  projects: ProjectType[];
  createProject: (data: ProjectType) => void;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, newProjectName: string) => void;
} => {
  const [{ projects }, dispatch] = useReducer(taskReducer, {
    tasks: [],
    projects: [],
  });

  const createProject = useCallback(async (data: ProjectType) => {
    dispatch({ type: "project/create", payload: data });
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    dispatch({ type: "project/delete", payload: projectId });
  }, []);

  const editProject = useCallback(
    async (projectId: string, newProjectName: string) => {
      dispatch({
        type: "project/edit",
        payload: { projectId, newProjectName },
      });
    },
    []
  );

  return { projects, createProject, deleteProject, editProject };
};

export const TaskContext = createContext<ReturnType<typeof useTaskSource>>(
  {} as unknown as ReturnType<typeof useTaskSource>
);

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TaskContext.Provider value={useTaskSource()}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
