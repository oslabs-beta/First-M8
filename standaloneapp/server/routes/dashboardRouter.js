const express = require('express');
const dashboardController = require("../controllers/dashboardController");
const { Chart } = require('../models/webModel');
const router = express.Router();


router.get('/', dashboardController.getAll, (req, res) => { 
    //insert query to database
    //all "cluster" information
    res.status(200).send(res.locals.data)},
    console.log(res.locals.data)
);

router.post('/newChart', dashboardController.createCluster, (req, res) => {
    res.status(200).send({'success': true})
});

module.exports = router;