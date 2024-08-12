import { useTasks } from "../hooks/useTasks";
//import { ActiveListDefaults } from "../types/activeListType";
import ProjectForm from "./ProjectForm";
import ProjectDisplay from "./ProjectDisplay";

const TasksDashboard = () => {
  const { openProjectForm, activeProject } = useTasks();
  // for displaying project management controls
  // const defaultList = Object.keys(ActiveListDefaults).includes(activeList);

  return (
    <section className="w-full p-4">
      {openProjectForm && <ProjectForm />}

      {activeProject && <ProjectDisplay />}
    </section>
  );
};

export default TasksDashboard;
