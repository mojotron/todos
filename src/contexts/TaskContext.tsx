import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import type ProjectType from "../types/projectType";
import { ActiveListType, ActiveListDefaults } from "../types/activeListType";

type StateType = {
  activeList: ActiveListType;
  tasks: [];
  projects: ProjectType[];
};

type ActionsType =
  | { type: "activeList/change"; payload: ActiveListType }
  | { type: "project/getAll"; payload: ProjectType[] }
  | { type: "project/create"; payload: ProjectType }
  | { type: "project/delete"; payload: string }
  | {
      type: "project/edit";
      payload: { projectId: string; newProjectName: string };
    };

const taskReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case "activeList/change":
      return { ...state, activeList: action.payload };
    case "project/getAll":
      return { ...state, projects: action.payload };
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
  activeList: ActiveListType;
  changeActiveList: (listName: ActiveListType) => void;
  projects: ProjectType[];
  createProject: (projectName: string) => void;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, newProjectName: string) => void;
} => {
  const [{ projects, activeList }, dispatch] = useReducer(taskReducer, {
    tasks: [],
    projects: [],
    activeList: ActiveListDefaults.all,
  });

  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => {
        if (response.data.status === "success") {
          dispatch({ type: "project/getAll", payload: response.data.projects });
        }
      })
      .catch();
  }, []);

  const changeActiveList = useCallback(
    (listName: ActiveListDefaults | string) => {
      dispatch({ type: "activeList/change", payload: listName });
    },
    []
  );

  const createProject = useCallback(async (projectName: string) => {
    console.log("hello", projectName);

    axios
      .post("/projects", { projectName })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          dispatch({ type: "project/create", payload: response.data.project });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
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

  return {
    activeList,
    changeActiveList,
    projects,
    createProject,
    deleteProject,
    editProject,
  };
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
