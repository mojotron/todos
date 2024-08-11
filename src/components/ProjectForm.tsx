import { FormEvent, useState } from "react";
import Button from "../ui/Button";
import CloseButton from "../ui/CloseButton";
import { useCreateProject } from "../hooks/useCreateProject";
import InputError from "../ui/InputError";
import { useTasks } from "../hooks/useTasks";
import OverlayWrapper from "../ui/OverlayWrapper";

type PropsType = {
  editActiveProject?: boolean;
  handleClose: () => void;
};

const ProjectForm = ({ editActiveProject = false, handleClose }: PropsType) => {
  const { activeProject, editProject } = useTasks();

  const [projectName, setProjectName] = useState(() =>
    editActiveProject === true && activeProject
      ? activeProject?.projectName
      : ""
  );

  const { loading, error, addProject } = useCreateProject();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (editActiveProject && activeProject) {
        await editProject(activeProject?._id, projectName);
      } else {
        await addProject(projectName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OverlayWrapper>
      <div>
        <div className="relative w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900">
          <CloseButton handleClick={handleClose} />
          <h2 className="font-display text-2xl">
            {editActiveProject ? `edit existing project` : "create new project"}
          </h2>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>project name</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
                <input
                  className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
                  type="text"
                  placeholder="world domination"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              {error && error.inputFieldsErrors.projectName && (
                <InputError message={error.inputFieldsErrors.projectName} />
              )}
            </div>

            <Button>{editActiveProject ? "rename" : "create"} project</Button>
          </form>
        </div>
      </div>
    </OverlayWrapper>
  );
};

export default ProjectForm;
