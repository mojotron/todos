import { FormEvent, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import CloseButton from "../ui/CloseButton";
import OverlayWrapper from "../ui/OverlayWrapper";
import Button from "../ui/Button";
//
import type TaskType from "../types/taskType";

const TaskForm = () => {
  const { toggleTaskForm } = useTasks();
  const [formData, setFormData] = useState<TaskType>({
    title: "",
    deadline: "",
    priority: "low",
    option: "text",
    description: [],
    projectId: undefined,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                required
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

          <Button>Create Task</Button>
        </form>
      </div>
    </OverlayWrapper>
  );
};

export default TaskForm;
