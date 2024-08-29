import { useTasks } from "../hooks/useTasks";
import Task from "./Task";
import ConfirmBox from "./ConfirmBox";

const TaskList = () => {
  const {
    filteredTasks,
    openTaskDeleteConfirm,
    toggleDeleteConfirm,
    deleteTask,
  } = useTasks();

  return (
    <section>
      {openTaskDeleteConfirm && (
        <ConfirmBox
          text={`Are you sure you want to delete "${
            filteredTasks.find((task) => task._id === openTaskDeleteConfirm)
              ?.title
          }" task?`}
          confirmHandler={() => deleteTask(openTaskDeleteConfirm)}
          cancelHandler={() => toggleDeleteConfirm(null)}
        />
      )}

      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <Task key={task._id} data={task} />
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
