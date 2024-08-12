import { FormEvent, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useCreateProject } from "../hooks/useCreateProject";
// components
import Button from "../ui/Button";
import CloseButton from "../ui/CloseButton";
import InputError from "../ui/InputError";
import OverlayWrapper from "../ui/OverlayWrapper";

type PropsType = {
  editActiveProject?: boolean;
};

const ProjectForm = ({ editActiveProject = false }: PropsType) => {
  const { activeProject, toggleProjectForm } = useTasks();

  const [projectName, setProjectName] = useState(() =>
    editActiveProject === true && activeProject
      ? activeProject?.projectName
      : ""
  );

  const { loading, error, addProject, updateProject } = useCreateProject();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editActiveProject && activeProject) {
      await updateProject(activeProject?._id, projectName);
    } else {
      await addProject(projectName);
    }
  };

  return (
    <OverlayWrapper>
      <div>
        <div className="relative w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900">
          <CloseButton handleClick={toggleProjectForm} />
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

            <Button disabled={loading}>
              {editActiveProject ? "rename" : "create"} project
            </Button>
          </form>
        </div>
      </div>
    </OverlayWrapper>
  );
};

export default ProjectForm;
