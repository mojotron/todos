import { FormEvent, useState } from "react";
import Button from "../ui/Button";
import CloseButton from "../ui/CloseButton";
import { useCreateProject } from "../hooks/useCreateProject";
import InputError from "../ui/InputError";

type PropsType = {
  projectId?: null | string;
  handleClose: () => void;
};

const ProjectForm = ({ projectId = null, handleClose }: PropsType) => {
  const [projectName, setProjectName] = useState("");
  const { loading, error, addProject } = useCreateProject();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectId === null) {
      console.log("no id");
      await addProject(projectName);
    }
  };

  console.log("loding", loading);
  console.log("err", error);

  return (
    <div>
      <div className="relative w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900">
        <CloseButton handleClick={handleClose} />
        <h2 className="font-display text-2xl">create new project</h2>
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

          <Button>create project</Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
