import { useTasks } from "../hooks/useTasks";
import { ActiveListDefaults } from "../types/activeListType";

import { BiEdit, BiTrash } from "react-icons/bi";

const TasksDashboard = () => {
  const { activeList } = useTasks();
  // for displaying project management controls
  const defaultList = Object.keys(ActiveListDefaults).includes(activeList);

  return (
    <section>
      <header className="w-full flex justify-between">
        <h2 className="text-white font-display text-3xl">{activeList}</h2>
        {!defaultList && (
          <div>
            <button className="flex items-center gap-[2px] text-gray-300 hover:text-green ">
              <BiEdit />
              <span>update project</span>
            </button>
            <button className="flex items-center gap-[2px] text-gray-300 hover:text-error">
              <BiTrash />
              <span>delete project</span>
            </button>
          </div>
        )}
      </header>
    </section>
  );
};

export default TasksDashboard;
