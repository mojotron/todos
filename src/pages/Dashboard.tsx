import { useState } from "react";
// icons
import { FaFolderOpen as IconFolder } from "react-icons/fa6";
import { FaTasks as IconTasks } from "react-icons/fa";
// components
import ProjectForm from "../components/ProjectForm";
import AsideButton from "../ui/AsideButton";
import ProjectsList from "../components/ProjectsList";
import TasksDashboard from "../components/TasksDashboard";

const Dashboard = () => {
  const [openProjectForm, setOpenProjectForm] = useState(false);

  return (
    <div className="min-h-[100vh] flex">
      {/* ASIDE */}
      <aside className="w-[200px] bg-gray-700 p-4 space-y-4">
        <div>
          <h3 className="font-bold font-display text-gray-300 text-lg flex gap-1 items-center">
            <IconTasks />
            <span className="relative top-[2px]">tasks</span>
          </h3>
          <ul className="text-white">
            <li>all tasks</li>
            <li>today</li>
            <li>7 days</li>
          </ul>
          <AsideButton text="new task" clickHandler={() => {}} />
        </div>

        <div>
          <h3 className="font-bold font-display text-gray-300 text-lg flex gap-1 items-center">
            <IconFolder />
            <span className="relative top-[2px]">projects</span>
          </h3>
          <ProjectsList />
          <AsideButton
            text="new project"
            clickHandler={() => setOpenProjectForm(true)}
          />
        </div>
      </aside>
      {/* TASK DISPLAY */}
      <section className="w-full p-4">
        {openProjectForm && (
          <ProjectForm handleClose={() => setOpenProjectForm(false)} />
        )}

        <TasksDashboard />
      </section>
    </div>
  );
};

export default Dashboard;
