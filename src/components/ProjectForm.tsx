import { FormEvent, useState } from "react";
import Button from "../ui/Button";
import CloseButton from "../ui/CloseButton";
import { useTasks } from "../hooks/useTasks";

type PropsType = {
  projectId?: null | string;
  handleClose: () => void;
};

const ProjectForm = ({ projectId = null, handleClose }: PropsType) => {
  const [projectName, setProjectName] = useState("");
  const { createProject } = useTasks();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle submit");

    if (projectId === null) {
      console.log("no id");

      createProject(projectName);
      handleClose();
    }
  };

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
          </div>

          <Button>create project</Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
