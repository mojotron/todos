import { useTasks } from "../hooks/useTasks";
import Task from "./Task";
import ConfirmBox from "./ConfirmBox";

const TaskList = () => {
  const { tasks, openTaskDeleteConfirm, toggleDeleteConfirm } = useTasks();

  return (
    <section>
      {openTaskDeleteConfirm && (
        <ConfirmBox
          text={`Are you sure you want to delete "${
            tasks.find((task) => task._id === openTaskDeleteConfirm)?.title
          }" task?`}
          confirmHandler={() => {}}
          cancelHandler={() => toggleDeleteConfirm(null)}
        />
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <Task key={task._id} data={task} />
        ))}
      </ul>
    </section>
  );
};

export default TaskList;
