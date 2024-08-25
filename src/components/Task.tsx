import { useState } from "react";
import { TASK_TYPES } from "../constants/taskConstants";
import TaskType, { TaskOptionType } from "../types/taskType";
import getTimeDistance from "../utils/getTimeDistance";
import Deadline from "./Deadline";
// icons
import { BiEdit, BiTrash } from "react-icons/bi";
import { useTasks } from "../hooks/useTasks";

type PropsType = {
  data: TaskType;
};

const Task = ({ data }: PropsType) => {
  const [taskOption, setTaskOption] = useState<TaskOptionType>("text");
  const { toggleDeleteConfirm } = useTasks();

  if (!data.assignment) return;

  return (
    <li>
      <article className="bg-gray-800">
        <header className="flex justify-between">
          <div className="mb-4">
            <h3 className="font-display text-white text-2xl">{data.title}</h3>
            {data.deadline && <Deadline timestamp={data.deadline} />}
          </div>
          <div className="flex justify-start items-start gap-2">
            <div className="flex flex-col text-gray-400">
              <span>
                priority:{" "}
                <span
                  className={`${
                    data.priority === "low"
                      ? "text-white"
                      : data.priority === "high"
                      ? "text-green"
                      : "text-error"
                  }`}
                >
                  {data.priority}
                </span>
              </span>
              <span className="text-sm">
                created: {getTimeDistance(data.createdAt)}
              </span>
              <span className="text-sm">
                last updated: {getTimeDistance(data.updatedAt)}
              </span>
            </div>
            <div className="flex gap-[2px]">
              <button
                title="edit task"
                onClick={() => {}}
                className="flex items-center gap-[2px] text-gray-300 hover:text-green"
              >
                <BiEdit />
              </button>
              <button
                title="delete task"
                onClick={() => toggleDeleteConfirm(data._id as string)}
                className="flex items-center gap-[2px] text-gray-300 hover:text-error"
              >
                <BiTrash />
              </button>
            </div>
          </div>
        </header>
        <section>
          <nav>
            <ul className="flex items-center">
              {TASK_TYPES.map((type) => (
                <li
                  className={`px-2 cursor-pointer ${
                    type === taskOption
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-800 text-gray-400"
                  }`}
                  key={type}
                  onClick={() => setTaskOption(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-h-8 bg-gray-700 px-2 py-3">
            {taskOption === "text" && (
              <div className="px-2">
                <h3 className="text-white text-lg mb-1">Description</h3>
                <p className="text-white">{data.assignment.text}</p>
              </div>
            )}
            {taskOption === "list" && (
              <ul>
                {data.assignment.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {taskOption === "checkbox" && (
              <ul>
                {data.assignment.checkbox.map((item, i) => (
                  <li
                    key={i}
                    className={`${
                      item.checked ? "line-through" : "no-line-through"
                    }`}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </article>
    </li>
  );
};

export default Task;
