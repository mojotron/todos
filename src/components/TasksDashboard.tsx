import { useTasks } from "../hooks/useTasks";
//import { ActiveListDefaults } from "../types/activeListType";
// icons
import { BiEdit, BiTrash } from "react-icons/bi";

import OverlayWrapper from "../ui/OverlayWrapper";
import ProjectForm from "./ProjectForm";

const TasksDashboard = () => {
  const { activeList, openProjectForm, toggleProjectForm, activeProject } =
    useTasks();
  // for displaying project management controls
  // const defaultList = Object.keys(ActiveListDefaults).includes(activeList);

  return (
    <section className="w-full p-4">
      {openProjectForm && (
        <OverlayWrapper>
          <ProjectForm handleClose={toggleProjectForm} />
        </OverlayWrapper>
      )}

      <header className="w-full flex justify-between">
        <h2 className="text-white font-display text-3xl">
          {activeProject ? activeProject.projectName : activeList}
        </h2>
        {activeProject && (
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
