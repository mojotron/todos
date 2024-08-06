import { useTasks } from "../hooks/useTasks";

const ProjectsList = () => {
  const { projects, changeActiveList } = useTasks();

  return (
    <ul className="text-white space-y-1 pb-2 w-full">
      {projects.map((project) => (
        <li key={project._id}>
          <button
            className=" hover:text-green"
            type="button"
            onClick={() => changeActiveList(project.projectName)}
          >
            {project.projectName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
