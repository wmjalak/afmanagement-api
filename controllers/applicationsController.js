function applicationsController(Application) {
  function post(req, res) {
    const application = new Application(req.body);
    application.save();
    res.status(201);
    return res.json(application);
  }
  function get(req, res) {
    const query = {};
    Application.find(query, (err, applications) => {
      if (err) {
        return res.send(err);
      }
      const returnApplications = applications.map((application) => {
        return application.toJSON();
      });
      return res.json(returnApplications);
    });
  }
  return { post, get };
}

module.exports = applicationsController;
