const express = require('express');
const dashboardController = require("../controllers/dashboardController");
const { ChartSetting } = require('../models/webModel');
const router = express.Router();


router.get('/', dashboardController.getAllDisplay, (req, res) => { 
    //insert query to database
    //all "cluster" information
    res.status(200).send(res.locals.data)},
);

router.post('/newChart/:name', dashboardController.createCluster, (req, res) => {
    res.status(200).send({'success': true})
});

router.patch('/allCharts', dashboardController.updateChart, (req, res) => {
    res.status(200).send({'success': true})
})
module.exports = router;