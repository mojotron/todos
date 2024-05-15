const notFound = (req, res) => {
  res
    .status(404)
    .json({
      status: 'failed',
      msg: `cannot find resources you are looking for`,
    });
};

export default notFound;
