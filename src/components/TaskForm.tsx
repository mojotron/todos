import { FormEvent, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import CloseButton from "../ui/CloseButton";
import OverlayWrapper from "../ui/OverlayWrapper";
import Button from "../ui/Button";
//
import { TASK_PRIORITY } from "../constants/taskConstants";
//
import type TaskType from "../types/taskType";
import TaskTypeCreator from "./TaskTypeCreator";
import { TaskAssignment } from "../types/taskType";

const TaskForm = () => {
  const {
    toggleTaskForm,
    projects,
    createTask,
    activeEditTask,
    filteredTasks,
    editTask,
  } = useTasks();
  const [formData, setFormData] = useState<TaskType>(() => {
    if (activeEditTask === null) {
      return {
        title: "",
        deadline: "",
        priority: "low",
        category: "text",
        projectId: undefined,
        createdAt: new Date().toLocaleString(navigator.language),
        updatedAt: new Date().toLocaleString(navigator.language),
        assignment: { text: "", list: [], checkbox: [] },
      };
    } else {
      return filteredTasks.find(
        (task) => task._id === activeEditTask
      ) as TaskType;
    }
  });

  const [assignment, setAssignment] = useState<TaskAssignment>(() => {
    if (activeEditTask === null) {
      return { text: "", list: [], checkbox: [] };
    } else {
      return filteredTasks.find((task) => task._id === activeEditTask)
        ?.assignment as TaskAssignment;
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeEditTask) {
      await editTask(formData, assignment);
    } else {
      await createTask(formData, assignment);
    }
  };

  return (
    <OverlayWrapper>
      <div className="relative w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900">
        <CloseButton handleClick={toggleTaskForm} />
        <h2 className="font-display text-2xl">Create Task</h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title">title</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
              <input
                className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((oldData) => ({
                    ...oldData,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="deadline">deadline</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
              <input
                className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((oldData) => ({
                    ...oldData,
                    deadline: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          {/* ADD TASK TO SINGLE PROJECT */}
          <div>
            <h3 className="font-display">add task to project</h3>
            <ul className="px-2 flex items-center gap-1">
              {projects.map((project) => (
                <button
                  type="button"
                  key={project._id}
                  className={`border rounded-md px-2 py-0.5 ${
                    project._id === formData.projectId
                      ? "border-green text-green"
                      : "border-white"
                  }`}
                  onClick={() =>
                    setFormData((oldValue) => ({
                      ...oldValue,
                      projectId: project._id,
                    }))
                  }
                >
                  {project.projectName}
                </button>
              ))}
              <button
                type="button"
                className={`border rounded-md px-2 py-0.5 ${
                  formData.projectId === undefined
                    ? "border-green text-green"
                    : "border-white"
                }`}
                onClick={() =>
                  setFormData((oldValue) => ({
                    ...oldValue,
                    projectId: undefined,
                  }))
                }
              >
                none
              </button>
            </ul>
          </div>
          {/* SELECT TASK PRIORITY */}
          <div>
            <h3 className="font-display">choose task priority</h3>
            <ul className="px-2 flex items-center gap-1">
              {TASK_PRIORITY.map((priority) => (
                <button
                  className={`border rounded-md px-2 py-0.5 ${
                    priority === formData.priority
                      ? "border-green text-green"
                      : "border-white"
                  }`}
                  key={priority}
                  type="button"
                  onClick={() =>
                    setFormData((oldValue) => ({
                      ...oldValue,
                      priority: priority,
                    }))
                  }
                >
                  {priority}
                </button>
              ))}
            </ul>
          </div>
          <TaskTypeCreator
            assignment={assignment}
            setAssignment={setAssignment}
          />

          <Button>{activeEditTask ? "Update" : "Create"} Task</Button>
        </form>
      </div>
    </OverlayWrapper>
  );
};

export default TaskForm;
