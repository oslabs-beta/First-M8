const express = require("express");
const webController = require("../controllers/webController");
const { Data } = require("../models/webModel");
const router = express.Router();

router.get("/all", webController.getAll, (req, res) => {
  //insert query to database
  //all "cluster" information
  res.status(200).send({ settings: res.locals.settings });
});

router.post(
  "/new",
  webController.createCluster,
  webController.getAll,
  (req, res) => {
    res.status(200).send({ settings: res.locals.settings });
  }
);

router.delete(
  "/:name/delete",
  webController.deleteCluster,
  webController.getAll,
  (req, res) => {
    res.status(200).send({ settings: res.locals.settings });
  }
);

router.put(
  "/:name",
  webController.updateCluster,
  webController.getAll,
  (req, res) => {
    res.status(200).send({ settings: res.locals.settings });
  }
);

module.exports = router;
