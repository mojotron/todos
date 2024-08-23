import { TASK_PRIORITY, TASK_TYPES } from "../constants/taskConstants";

const priorities = [...TASK_PRIORITY] as const;
export type TaskPriorityType = (typeof priorities)[number];

const taskOptions = [...TASK_TYPES] as const;
export type TaskOptionType = (typeof taskOptions)[number];

export type TaskAssignment = {
  text: string;
  list: string[];
  checkbox: { checked: boolean; value: string }[];
};

export type TaskType = {
  _id?: string;
  title: string;
  deadline: undefined | string;
  priority: TaskPriorityType;
  category: TaskOptionType;
  projectId: undefined | string;
  assignment: TaskAssignment;
};

export default TaskType;
