/* eslint-disable no-param-reassign */
const express = require('express');
const configurationsController = require('../controllers/configurationsController');

function routes(Configuration) {
  const router = express.Router();
  const controller = configurationsController(Configuration);
  router.route('/configurations')
    .get(controller.get)
    .post(controller.post);

  router.use('/configurations/:configurationId', (req, res, next) => {
    Configuration.findById(req.params.configurationId, (err, configuration) => {
        if (err) {
          return res.send(err);
        }
        if (configuration) {
          req.configuration = configuration;
          return next();
        }
        return res.sendStatus(404);
      });
    });


  router.route('/configurations/:configurationId')
    .get((req, res) => {
      const result = req.configuration.toJSON();
      res.json(result);
    })
    .put((req, res) => {
      let { configuration } = req;
      configuration.name = req.body.name;
      configuration.description = req.body.description;
      configuration.attributes = req.body.attributes;

      req.configuration.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(configuration);
      });
    })
    .delete((req, res) => {
      req.configuration.remove((err) => {
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
