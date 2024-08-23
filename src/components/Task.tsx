import { useState } from "react";
import { TASK_TYPES } from "../constants/taskConstants";
import TaskType, { TaskOptionType } from "../types/taskType";

type PropsType = {
  data: TaskType;
};

const Task = ({ data }: PropsType) => {
  const [taskOption, setTaskOption] = useState<TaskOptionType>("text");

  return (
    <li>
      <article className="bg-gray-800">
        <header className="flex justify-between">
          <h3 className="font-display text-white text-2xl">{data.title}</h3>
          <div>
            <span
              className={`${
                data.priority === "low"
                  ? "text-gray-400"
                  : data.priority === "high"
                  ? "text-green"
                  : "text-error"
              }`}
            >
              {data.priority} priority
            </span>
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
            {taskOption === "text" && <p>{data.assignment.text}</p>}
          </div>
        </section>
      </article>
    </li>
  );
};

export default Task;
