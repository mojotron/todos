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
  openProjectForm: boolean;
  tasks: [];
  projects: ProjectType[];
  activeProject: ProjectType | undefined;
};

type ActionsType =
  | { type: "activeList/change"; payload: ActiveListType }
  | { type: "toggle/projectForm" }
  | { type: "project/getAll"; payload: ProjectType[] }
  | { type: "project/create"; payload: ProjectType }
  | { type: "project/delete"; payload: string }
  | {
      type: "project/edit";
      payload: { projectId: string; newProjectName: string };
    }
  | { type: "project/active"; payload: string | null };

const taskReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case "activeList/change":
      return { ...state, activeList: action.payload };
    case "toggle/projectForm":
      return { ...state, openProjectForm: !state.openProjectForm };
    case "project/getAll":
      return { ...state, projects: action.payload };
    case "project/create":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        openProjectForm: false,
      };
    case "project/delete":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        activeProject: undefined,
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
    case "project/active":
      return {
        ...state,
        activeProject: state.projects.find(
          (project) => project.projectName === action.payload
        ),
      };
    default:
      return { ...state };
  }
};

const useTaskSource = (): {
  activeList: ActiveListType;
  changeActiveList: (listName: ActiveListType) => void;
  openProjectForm: boolean;
  toggleProjectForm: () => void;
  projects: ProjectType[];
  createProject: (projectName: string) => Promise<void>;
  deleteProject: (projectId: string) => void;
  editProject: (projectId: string, newProjectName: string) => void;
  activeProject: ProjectType | undefined;
  setActiveProject: (project: string) => void;
} => {
  const [{ projects, activeList, openProjectForm, activeProject }, dispatch] =
    useReducer(taskReducer, {
      tasks: [],
      projects: [],
      activeList: ActiveListDefaults.all,
      openProjectForm: false,
      activeProject: undefined,
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
    try {
      const response = await axios.post("/projects", { projectName });
      if (response.data.status === "success") {
        dispatch({ type: "project/create", payload: response.data.project });
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const response = await axios.delete(`/projects/${projectId}`);
      if (response.data.status === "success") {
        dispatch({ type: "project/delete", payload: projectId });
      }
    } catch (error) {
      throw error;
    }
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

  const toggleProjectForm = useCallback(() => {
    dispatch({ type: "toggle/projectForm" });
  }, []);

  const setActiveProject = useCallback((project: string) => {
    dispatch({ type: "project/active", payload: project });
  }, []);

  return {
    activeList,
    changeActiveList,
    openProjectForm,
    toggleProjectForm,
    projects,
    createProject,
    deleteProject,
    editProject,
    activeProject,
    setActiveProject,
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
