import { useTasks } from "../hooks/useTasks";
//import { ActiveListDefaults } from "../types/activeListType";
import ProjectForm from "./ProjectForm";
import ProjectDisplay from "./ProjectDisplay";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TasksDashboard = () => {
  const { openProjectForm, activeProject, openTaskForm } = useTasks();
  // for displaying project management controls
  // const defaultList = Object.keys(ActiveListDefaults).includes(activeList);

  return (
    <section className="w-full p-4">
      {openProjectForm && <ProjectForm />}
      {openTaskForm && <TaskForm />}

      {activeProject && <ProjectDisplay />}

      <TaskList />
    </section>
  );
};

export default TasksDashboard;
