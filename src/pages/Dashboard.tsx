import { FaFolderOpen as IconFolder } from "react-icons/fa6";
import { FaTasks as IconTasks } from "react-icons/fa";
import ProjectForm from "../components/ProjectForm";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import AsideButton from "../ui/AsideButton";

const Dashboard = () => {
  const { projects } = useTasks();
  const [openProjectForm, setOpenProjectForm] = useState(false);

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
          <AsideButton text="new task" clickHandler={() => {}} />
        </div>

        <div>
          <h3 className="font-bold font-display text-green text-lg flex gap-1 items-center">
            <IconFolder />
            <span className="relative top-[2px]">projects</span>
          </h3>
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <h3>{project.projectName}</h3>
              </li>
            ))}
          </ul>
          <AsideButton
            text="new project"
            clickHandler={() => setOpenProjectForm(true)}
          />
        </div>
      </aside>
      {/* TASK DISPLAY */}
      <section>
        <h2>all tasks</h2>
        <section>
          {openProjectForm && (
            <ProjectForm handleClose={() => setOpenProjectForm(false)} />
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
