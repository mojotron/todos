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
import TaskType, { TaskAssignment } from "../types/taskType";

type StateType = {
  activeList: ActiveListType;
  openProjectForm: boolean;
  tasks: TaskType[];
  projects: ProjectType[];
  activeProject: ProjectType | undefined;
  openTaskForm: boolean;
};

type ActionsType =
  | { type: "activeList/change"; payload: ActiveListType }
  | { type: "toggle/projectForm" }
  | { type: "toggle/taskForm" }
  | { type: "project/getAll"; payload: ProjectType[] }
  | { type: "project/create"; payload: ProjectType }
  | { type: "project/delete"; payload: string }
  | {
      type: "project/edit";
      payload: { projectId: string; newProjectName: string };
    }
  | { type: "project/active"; payload: string | null }
  | {
      type: "task/create";
      payload: { task: TaskType; assignment: TaskAssignment };
    };

const taskReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case "activeList/change":
      return { ...state, activeList: action.payload };
    case "toggle/projectForm":
      return { ...state, openProjectForm: !state.openProjectForm };
    case "toggle/taskForm":
      return { ...state, openTaskForm: !state.openTaskForm };
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
            ? { _id: project._id, projectName: action.payload.newProjectName }
            : project
        ),
        openProjectForm: false,
        activeProject: {
          ...state.activeProject,
          projectName: action.payload.newProjectName,
        } as ProjectType,
      };
    case "project/active":
      return {
        ...state,
        activeProject: state.projects.find(
          (project) => project.projectName === action.payload
        ),
      };
    case "task/create":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload.task,
            assignment: { ...action.payload.assignment },
          },
        ] as TaskType[],
        openTaskForm: false,
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
  openTaskForm: boolean;
  toggleTaskForm: () => void;
  createTask: (task: TaskType, assignment: TaskAssignment) => Promise<void>;
} => {
  const [
    { projects, activeList, openProjectForm, activeProject, openTaskForm },
    dispatch,
  ] = useReducer(taskReducer, {
    tasks: [],
    projects: [],
    activeList: ActiveListDefaults.all,
    openProjectForm: false,
    activeProject: undefined,
    openTaskForm: false,
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
      try {
        const response = await axios.patch(`/projects/${projectId}`, {
          projectName: newProjectName,
        });
        if (response.data.status === "success") {
          dispatch({
            type: "project/edit",
            payload: { projectId, newProjectName },
          });
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const toggleProjectForm = useCallback(() => {
    dispatch({ type: "toggle/projectForm" });
  }, []);

  const toggleTaskForm = useCallback(() => {
    dispatch({ type: "toggle/taskForm" });
  }, []);

  const setActiveProject = useCallback((project: string) => {
    dispatch({ type: "project/active", payload: project });
  }, []);

  const createTask = useCallback(
    async (task: TaskType, assignment: TaskAssignment) => {
      try {
        const response = await axios.post(`/tasks/`, { ...task, assignment });
        if (response.data.status === "success") {
          // const data = response.data;
          dispatch({ type: "task/create", payload: { task, assignment } });
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

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
    openTaskForm,
    toggleTaskForm,
    createTask,
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
