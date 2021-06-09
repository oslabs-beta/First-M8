const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { ChartSetting } = require("../models/webModel");
const router = express.Router();

router.get("/", dashboardController.getAllDisplay, (req, res) => {
  //insert query to database
  //all "cluster" information
  res.status(200).send(res.locals.data);
});

router.get(
  "/dashboard/editChart/:name",
  dashboardController.getChartSetting,
  (req, res) => {
    res.status(200).send(res.locals.columns);
  }
);

router.get(
  "/dashboard/chart/:name",
  dashboardController.getChartSetting,
  dashboardController.findAndComfirm,
  (req, res) => {
    res.status(200).send(res.locals.chartExists);
  }
);

router.post("/newChart/:name", dashboardController.createChart, (req, res) => {
  res.status(200).send({ success: true });
});

router.patch("/allCharts", dashboardController.updateChart, (req, res) => {
  res.status(200).send({ success: true });
});

//add route for custom query
//save it inside database called history
// router.post();

module.exports = router;
