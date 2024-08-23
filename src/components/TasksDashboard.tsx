import { useTasks } from "../hooks/useTasks";
//import { ActiveListDefaults } from "../types/activeListType";
import ProjectForm from "./ProjectForm";
import ProjectDisplay from "./ProjectDisplay";
import TaskForm from "./TaskForm";
import Task from "./Task";

const TasksDashboard = () => {
  const { openProjectForm, activeProject, openTaskForm, tasks } = useTasks();
  // for displaying project management controls
  // const defaultList = Object.keys(ActiveListDefaults).includes(activeList);

  return (
    <section className="w-full p-4">
      {openProjectForm && <ProjectForm />}
      {openTaskForm && <TaskForm />}
      {activeProject && <ProjectDisplay />}
      <section>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <Task key={task._id} data={task} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default TasksDashboard;
