// icons
import { BiEdit, BiTrash } from "react-icons/bi";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";
import ConfirmBox from "./ConfirmBox";
import ProjectForm from "./ProjectForm";

const ProjectDisplay = () => {
  const { activeProject, deleteProject } = useTasks();

  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);

  const handleDeleteProject = async () => {
    if (!activeProject) return;
    try {
      await deleteProject(activeProject._id);
      setOpenConfirmBox(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="w-full">
      {openConfirmBox && (
        <ConfirmBox
          text={`You are about to delete ${activeProject?.projectName} project?`}
          confirmHandler={handleDeleteProject}
          cancelHandler={() => setOpenConfirmBox(false)}
        />
      )}

      {openEditProject && (
        <ProjectForm
          editActiveProject={true}
          handleClose={() => setOpenEditProject(false)}
        />
      )}

      <header className="w-full flex justify-between">
        <h2 className="text-white font-display text-3xl">
          {activeProject?.projectName}
        </h2>

        <div>
          <button
            onClick={() => setOpenEditProject(true)}
            className="flex items-center gap-[2px] text-gray-300 hover:text-green "
          >
            <BiEdit />
            <span>update project</span>
          </button>
          <button
            onClick={() => setOpenConfirmBox(true)}
            className="flex items-center gap-[2px] text-gray-300 hover:text-error"
          >
            <BiTrash />
            <span>delete project</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default ProjectDisplay;
