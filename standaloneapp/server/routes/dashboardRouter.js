const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

/*
sends back query result of getting all display for
a particular Prometheus instance
*/
router.get('/:instance', dashboardController.getAllDisplay, (req, res) => {
  res.status(200).send(res.locals.data);
});

/*
sends back whether creating a new chart setting was successful
*/
router.post('/newChart/:name', dashboardController.createChartSetting, (req, res) => {
  res.status(200).send({ success: true });
});

/*
sends back whether updating all display for a particular
Prometheus instance was successful
*/
router.patch('/allCharts/:instance', dashboardController.updateAllDisplay, (req, res) => {
  res.status(200).send({ success: true });
});

/*
sends back query result of getting chart setting for
a particular chart name
*/
router.get('/editChart/:name', dashboardController.getChartSetting, (req, res) => {
  res.status(200).send(res.locals.chartSetting);
});

/*
sends back whether a chart name already exists
*/
router.get(
  '/chart/:name',
  dashboardController.getChartSetting,
  dashboardController.checkIfChartExists,
  (req, res) => {
    res.status(200).send(res.locals.chartExists);
  },
);

/*
sends back whether deleting chart setting for a particular
chart name and a single display for a particular Prometheus
instance was successful
*/
router.delete(
  '/deleteChart/:instance/:name',
  dashboardController.deleteChartSetting,
  dashboardController.getAllDisplay,
  dashboardController.deleteSingleDisplay,
  (req, res) => {
    res.status(200).send(res.locals.data);
  },
);

/*
sends back whether updating chart setting for a particular
chart name and a single display for a particular
Prometheus instance was successful
*/
router.patch(
  '/editChart/:name',
  dashboardController.updateChartSetting,
  dashboardController.updateSingleDisplay,
  (req, res) => {
    res.status(200).send({ success: true });
  },
);

/*
sends back query result of getting info for all Prometheus instances
*/
router.get('/connect/all', dashboardController.getAllPrometheusInstances, (req, res) => {
  res.status(200).send(res.locals.allPrometheusInstances);
});

/*
sends back query result of getting info for a particular
Prometheus instance
*/
router.get('/connect/:name', dashboardController.getPrometheusInstance, (req, res) => {
  res.status(200).send(res.locals.prometheusInstance);
});
module.exports = router;
