var db = require("../models");

module.exports = function(app) {
  // Load index page
 var service=null;
  app.get("/", function(req, res) {
    db.Services.findAll({limit:3}).then(function(dbService) {
      service=dbService;
    });
    //res.render("index");
        db.Store.findAll({limit:3}).then(function(dbStores) {
        res.render("index", {
           stores: dbStores,
           service: service
         });
      });
  });
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
  // Render store page and pass in a store id
  app.get("/stores/", function(req, res) {
    res.render("stores");
  });
  // Render store page and pass in a store id
  app.get("/stores/setup/", function(req, res) {
    res.render("storeSetup", { layout: "empty" });
  });
  // Render store page and pass in a store id
  app.get("/store/:id", function(req, res) {
    res.render("store");
  });
  // Render service page and pass in a service id
  app.get("/service/:id", function(req, res) {
    res.render("service", { layout: "empty" });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
