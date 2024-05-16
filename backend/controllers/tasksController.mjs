const getTasks = (req, res) => {
  return res.status(200).json({ msg: 'get all task' });
};

const getTask = (req, res) => {
  res.status(200).json({ msg: 'get single task' });
};

const createTask = (req, res) => {
  res.status(200).json({ msg: 'create task' });
};

const updateTask = (req, res) => {
  res.status(200).json({ msg: 'update task' });
};

const deleteTask = (req, res) => {
  res.status(200).json({ msg: 'delete task' });
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
