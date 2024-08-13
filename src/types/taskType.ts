import { TASK_PRIORITY, TASK_TYPES } from "../constants/taskConstants";

const priorities = [...TASK_PRIORITY] as const;
export type TaskPriorityType = (typeof priorities)[number];

const taskOptions = [...TASK_TYPES] as const;
export type TaskOptionType = (typeof taskOptions)[number];

type TaskDescription = {
  checked: boolean;
  text: string;
};

export type TaskType = {
  _id?: string;
  title: string;
  deadline: undefined | string;
  priority: TaskPriorityType;
  option: TaskOptionType;
  projectId: undefined | string;
  description: TaskDescription[];
};

export default TaskType;
