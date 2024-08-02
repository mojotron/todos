import { FaFolderOpen as IconFolder } from "react-icons/fa6";
import { FaTasks as IconTasks } from "react-icons/fa";
import { MdPlaylistAddCircle as IconAddTask } from "react-icons/md";
import { AiFillFolderAdd as IconAddFolder } from "react-icons/ai";
import CreateProjectForm from "../components/CreateProjectForm";

const Dashboard = () => {
  return (
    <div className="min-h-[100vh] flex">
      {/* ASIDE */}
      <aside className="bg-gray-700 p-4 space-y-4">
        <div>
          <h3 className="font-bold font-display text-green text-lg flex gap-1 items-center">
            <IconTasks />
            <span className="relative top-[2px]">tasks</span>
          </h3>
          <ul className="text-white">
            <li>all tasks</li>
            <li>today</li>
            <li>7 days</li>
          </ul>
          <button className="flex items-center">
            <IconAddTask />
            <span>new task</span>
          </button>
        </div>

        <div>
          <h3 className="font-bold font-display text-green text-lg flex gap-1 items-center">
            <IconFolder />
            <span className="relative top-[2px]">projects</span>
          </h3>
          <ul>
            <li>temp</li>
          </ul>
          <button className="flex items-center">
            <IconAddFolder />
            <span>new project</span>
          </button>
        </div>
      </aside>
      {/* TASK DISPLAY */}
      <section>
        <h2>all tasks</h2>
        <section>
          <CreateProjectForm />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
