function configurationsController(Configuration) {
  function post(req, res) {
    const configuration = new Configuration(req.body);
    configuration.save();
    res.status(201);
    return res.json(configuration);
  }
  function get(req, res) {
    const query = {};
    Configuration.find(query, (err, configurations) => {
      if (err) {
        return res.send(err);
      }
      const returnConfigurations = configurations.map((configuration) => {
        return configuration.toJSON();
      });
      return res.json(returnConfigurations);
    });
  }
  return { post, get };
}

module.exports = configurationsController;
