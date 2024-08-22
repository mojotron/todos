import { useTasks } from "../hooks/useTasks";
//import { ActiveListDefaults } from "../types/activeListType";
import ProjectForm from "./ProjectForm";
import ProjectDisplay from "./ProjectDisplay";
import TaskForm from "./TaskForm";

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
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <article>
                <header>
                  <h2 className="font-display text-2xl text-white">
                    {task.title}
                  </h2>
                </header>
                <section></section>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default TasksDashboard;
