// icons
import { FaFolderOpen as IconFolder } from "react-icons/fa6";
import { FaTasks as IconTasks } from "react-icons/fa";
// components
import { ActiveListDefaults } from "../types/activeListType";
import AsideButton from "../ui/AsideButton";
import ProjectsList from "../components/ProjectsList";
import TasksDashboard from "../components/TasksDashboard";

import { useTasks } from "../hooks/useTasks";

const Dashboard = () => {
  const { toggleProjectForm, toggleTaskForm, changeActiveList, activeList } =
    useTasks();

  return (
    <div className="flex w-full">
      {/* ASIDE */}
      <aside className="w-[200px] bg-gray-800  p-4 space-y-4">
        <div>
          <h3 className="font-bold font-display text-gray-300 text-lg flex gap-1 items-center">
            <IconTasks />
            <span className="relative top-[2px]">tasks</span>
          </h3>
          <ul className="text-white">
            {Object.keys(ActiveListDefaults).map((ele) => (
              <li
                className={`${
                  ele === activeList ? "text-green" : "text-white"
                } cursor-pointer`}
                key={ele}
                onClick={() => changeActiveList(ele)}
              >
                {ele}
              </li>
            ))}
          </ul>
          <AsideButton text="new task" clickHandler={toggleTaskForm} />
        </div>

        <div>
          <h3 className="font-bold font-display text-gray-300 text-lg flex gap-1 items-center">
            <IconFolder />
            <span className="relative top-[2px]">projects</span>
          </h3>
          <ProjectsList />
          <AsideButton text="new project" clickHandler={toggleProjectForm} />
        </div>
      </aside>
      {/* TASK DISPLAY */}

      <TasksDashboard />
    </div>
  );
};

export default Dashboard;
