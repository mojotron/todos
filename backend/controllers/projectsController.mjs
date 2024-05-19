const getProjects = (req, res) => {
  res.status(200).json({ msg: 'get all projects' });
};

const getProject = (req, res) => {
  res.status(200).json({ msg: 'get project' });
};

const createProject = (req, res) => {
  res.status(200).json({ msg: 'create new project' });
};

const updateProject = (req, res) => {
  res.status(200).json({ msg: 'update project' });
};

const deleteProject = (req, res) => {
  res.status(200).json({ msg: 'delete project' });
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
