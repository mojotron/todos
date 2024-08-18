import { Dispatch, SetStateAction, useState } from "react";
import { TaskAssignment, TaskOptionType } from "../types/taskType";
import { TASK_TYPES } from "../constants/taskConstants";

type PropsType = {
  assignment: TaskAssignment;
  setAssignment: Dispatch<SetStateAction<TaskAssignment>>;
};

const TaskTypeCreator = ({ assignment, setAssignment }: PropsType) => {
  const [activeType, setActiveType] = useState<TaskOptionType>("text");

  const [listItem, setListItem] = useState("");
  const [itemIndex, setItemIndex] = useState<null | number>(null);
  // list type handlers
  const cancelEditListItem = () => {
    setItemIndex(null);
    setListItem("");
  };

  const removeListItem = (index: number) => {
    setAssignment((oldValue) => ({
      ...oldValue,
      list: oldValue.list.filter((_, i) => i !== index),
    }));
    cancelEditListItem();
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

  const updateListItem = () => {
    setAssignment((oldValue) => ({
      ...oldValue,
      list: oldValue.list.map((item, i) => (i === itemIndex ? listItem : item)),
    }));
    cancelEditListItem();
  };

  // checkbox handlers
  const toggleItemChecked = (index: number) => {
    setAssignment((oldValue) => ({
      ...oldValue,
      checkbox: oldValue.checkbox.map((ele, i) =>
        i === index ? { ...ele, checked: !ele.checked } : ele
      ),
    }));
  };

  const removeCheckBoxItem = (index: number) => {
    setAssignment((oldValue) => ({
      ...oldValue,
      checkbox: oldValue.checkbox.filter((_, i) => i !== index),
    }));
  };

  const addCheckBoxItem = () => {
    setAssignment((oldValue) => ({
      ...oldValue,
      checkbox: [...oldValue.checkbox, { checked: false, value: listItem }],
    }));
    cancelEditListItem();
  };

  const setEditCheckBoxItem = (index: number) => {
    setItemIndex(index);
    setListItem(assignment.checkbox[index].value);
  };

  const updateCheckBoxItem = () => {
    setAssignment((oldValue) => ({
      ...oldValue,
      checkbox: oldValue.checkbox.map((item, i) =>
        i === itemIndex ? { ...item, value: listItem } : item
      ),
    }));
    cancelEditListItem();
  };

  return (
    <div className="">
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
        {/* TEXT OPTION */}
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

        {/* LIST OPTION*/}
        {activeType === "list" && (
          <div className="flex-flex-col">
            <ul className="space-y-1 mb-1">
              {assignment.list.map((item, i) => (
                <li
                  className={`border px-2 py-0.5 rounded-md flex justify-between items-start gap-2 ${
                    i === itemIndex ? "border-blue text-blue" : "border-white"
                  }`}
                  key={i}
                >
                  <p className="space-x-1">
                    <span className="text-sm text-gray-400">{i + 1}.</span>
                    <span>{item}</span>
                  </p>
                  <div className="space-x-1 text-sm flex">
                    <button
                      type="button"
                      className={`hover:text-green ${
                        i === itemIndex ? "text-blue" : "text-gray-400"
                      }`}
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

        {/* CHECKBOX OPTION */}
        {activeType === "checkbox" && (
          <div className="flex-flex-col">
            <div className="space-y-1 mb-2">
              {assignment.checkbox.map((item, i) => (
                <li
                  className={`border px-2 py-0.5 rounded-md flex justify-between items-center ${
                    i === itemIndex ? "border-blue text-blue" : "border-white"
                  }`}
                  key={i}
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItemChecked(i)}
                    />
                    <p
                      className={`${
                        item.checked ? "line-through" : "no-line-through"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                  <div className="space-x-1 text-sm">
                    <button
                      type="button"
                      className={`hover:text-green ${
                        i === itemIndex ? "text-blue" : "text-gray-400"
                      }`}
                      onClick={() => setEditCheckBoxItem(i)}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-error"
                      onClick={() => removeCheckBoxItem(i)}
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </div>
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
                  <button type="button" onClick={updateCheckBoxItem}>
                    update
                  </button>
                </>
              ) : (
                <button type="button" onClick={addCheckBoxItem}>
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
