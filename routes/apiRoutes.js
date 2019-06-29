var db = require("../models");

module.exports = function(app) {
  // Create a new store
  app.post("/api/storeSetup", function(req, res) {
    db.Store.create(req.body).then(function(dbStore) {
      res.json(dbStore);
      console.log(dbStore.id);
    });
  });
  // Create a new service
  app.post("/api/serviceSetup", function(req, res) {
    db.Services.create(req.body).then(function(dbService) {
      res.json(dbService);
      console.log(dbService.id);
    });
  });

  // Get all services
  app.get("/api/services/:id", function(req, res) {
    db.Services.findAll({ where: { StoreId: req.params.id } }).then(function(
      dbServices
    ) {
      res.json(dbServices);
    });
  });

  // Delete a service by id
  app.delete("/api/services/:id", function(req, res) {
    db.Services.destroy({ where: { id: req.params.id } }).then(function(
      dbServices
    ) {
      res.json(dbServices);
    });
  });

  // Create a new service
  app.post("/api/comments", function(req, res) {
    db.Comments.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });
};
