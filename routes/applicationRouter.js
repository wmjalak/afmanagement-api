/* eslint-disable no-param-reassign */
const express = require('express');
const applicationsController = require('../controllers/applicationsController');

function routes(Application) {
  const router = express.Router();
  const controller = applicationsController(Application);
  router.route('/applications')
    .get(controller.get)
    .post(controller.post);

  router.use('/applications/:applicationId', (req, res, next) => {
    Application.findById(req.params.applicationId, (err, application) => {
        if (err) {
          return res.send(err);
        }
        if (application) {
          req.application = application;
          return next();
        }
        return res.sendStatus(404);
      });
    });


  router.route('/applications/:applicationId')
    .get((req, res) => {
      const result = req.application.toJSON();
      res.json(result);
    })
    .put((req, res) => {

      let { application } = req;
      application.name = req.body.name;
      application.url = req.body.url;
      application.configurationId = req.body.configurationId;
      application.configuration = req.body.configuration;

      req.application.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(application);
      });
    })
    .delete((req, res) => {
      req.application.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
    ;


  return router;
}

module.exports = routes;
