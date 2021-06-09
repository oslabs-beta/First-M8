const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { ChartSetting } = require("../models/webModel");
const router = express.Router();

router.get("/", 
  dashboardController.getAllDisplay, (req, res) => {
  //insert query to database
  //all "cluster" information
  res.status(200).send(res.locals.data);
});

router.post("/newChart/:name", dashboardController.createChartSetting, (req, res) => {
  res.status(200).send({ success: true });
});

router.patch("/allCharts", dashboardController.updateAllDisplay, (req, res) => {
  res.status(200).send({ success: true });
});

router.get("/editChart/:name", dashboardController.getChartSetting, (req, res) => {
  res.status(200).send(res.locals.chartSetting);
});

router.get("/chart/:name", dashboardController.getChartSetting, dashboardController.checkIfChartExists, (req, res) => {
  res.status(200).send(res.locals.chartExists);
})

router.delete("/deleteChart/:name",
  dashboardController.deleteChartSetting,
  dashboardController.getAllDisplay,
  dashboardController.deleteSingleDisplay,
  (req, res) => {
    res.status(200).send(res.locals.data);
  }
);

router.patch("/editChart/:name",
  dashboardController.updateChartSetting,
  dashboardController.updateSingleDisplay,
  (req, res) => {
    res.status(200).send({ success: true })
  }
);

router.get("/connect/all",
  dashboardController.getAllPrometheusInstances,
  (req, res) => {
    res.status(200).send(res.locals.allPrometheusInstances);
  }
)

router.get("/connect/:name",
  dashboardController.getPrometheusInstance,
  (req, res) => {
    res.status(200).send(res.locals.prometheusInstance);
  }
)
module.exports = router;
