import { useTasks } from "../hooks/useTasks";

const ProjectsList = () => {
  const { projects, setActiveProject, activeProject } = useTasks();

  return (
    <ul className="text-white space-y-1 pb-2 w-full">
      {projects.map((project) => (
        <li key={project._id}>
          <button
            className={`${
              project === activeProject ? "text-green" : "text-white"
            } cursor-pointer`}
            type="button"
            onClick={() => setActiveProject(project.projectName)}
          >
            {project.projectName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
