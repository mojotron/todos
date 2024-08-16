import { useState } from "react";
import { TaskOptionType } from "../types/taskType";
import { TASK_TYPES } from "../constants/taskConstants";
import Button from "../ui/Button";

const TaskTypeCreator = () => {
  const [activeType, setActiveType] = useState<TaskOptionType>("text");
  const [assignment, setAssignment] = useState({
    text: "",
    list: ["alpha", "beta"],
  });

  const [listItem, setListItem] = useState("");
  const [itemIndex, setItemIndex] = useState<null | number>(null);
  // list type handlers
  const removeListItem = (index: number) => {
    setAssignment((oldValue) => ({
      ...oldValue,
      list: oldValue.list.filter((_, i) => i !== index),
    }));
  };

  const addListItem = () => {
    if (listItem === "") return;
    setAssignment((oldValue) => ({
      ...oldValue,
      list: [...oldValue.list, listItem],
    }));
    setListItem("");
  };

  const setEditListItem = (index: number) => {
    setItemIndex(index);
    setListItem(assignment.list[index]);
  };

  const cancelEditListItem = () => {
    setItemIndex(null);
    setListItem("");
  };

  const updateListItem = () => {
    setAssignment((oldValue) => ({
      ...oldValue,
      list: oldValue.list.map((item, i) => (i === itemIndex ? listItem : item)),
    }));
    setItemIndex(null);
    setListItem("");
  };

  return (
    <div className="py-4">
      <h3>choose task assignment type</h3>

      <section className="p-2 space-x-1">
        {TASK_TYPES.map((type) => (
          <button
            type="button"
            className={`border px-1 py-0.5 rounded-md ${
              activeType === type
                ? "border-green text-green"
                : "border-gray-600"
            }`}
            key={type}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </section>
      <section>
        {activeType === "text" && (
          <div className="flex flex-col">
            <label htmlFor="textTask">task description</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-green to-blue">
              <textarea
                className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
                id="textTask"
                value={assignment.text}
                onChange={(e) =>
                  setAssignment((old) => ({ ...old, text: e.target.value }))
                }
              ></textarea>
            </div>
          </div>
        )}

        {activeType === "list" && (
          <div className="flex-flex-col">
            <ul className="space-y-1">
              {assignment.list.map((item, i) => (
                <li
                  className="border px-2 py-0.5 rounded-md flex justify-between items-center"
                  key={i}
                >
                  <p>{item}</p>
                  <div className="space-x-1 text-sm">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-green"
                      onClick={() => setEditListItem(i)}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-error"
                      onClick={() => removeListItem(i)}
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between gap-2">
              <div className="p-[2px] flex-grow rounded-md bg-gradient-to-r from-green to-blue">
                <input
                  type="text"
                  className="w-full rounded-md focus:outline-none bg-white text-gray-700 px-2 py-[3px]"
                  value={listItem}
                  onChange={(e) => setListItem(e.target.value)}
                />
              </div>

              {itemIndex !== null ? (
                <>
                  <button type="button" onClick={cancelEditListItem}>
                    cancel
                  </button>
                  <button type="button" onClick={updateListItem}>
                    update
                  </button>
                </>
              ) : (
                <button type="button" onClick={addListItem}>
                  add
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TaskTypeCreator;
