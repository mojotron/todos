import { useState } from "react";
import Button from "../ui/Button";

const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = () => {};

  return (
    <div>
      <div className="w-full sm:w-[400px] text-white px-4 py-6 rounded-md bg-gray-900">
        <h2 className="font-display text-2xl">create new project</h2>
        <form className="space-y-2">
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

export default CreateProjectForm;
