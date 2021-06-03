const { Chart } = require("../models/webModel")

const dashboardController = {}

dashboardController.getAll = (req, res, next) => {
    //possibly come back to
    Chart.find({}, (err, data) => { 
        if (err) {
            //status: 500, log, message
            return next({status:500, log:'There was an error', message: err.message});
        }
        res.locals.data = data;
        return next();
    })
}

dashboardController.createCluster = (req, res, next) => {
    //insert DB stuff
    //send back a confirmation object similar to what alex mentioned
    //{'success': true || false}
    console.log(req.body)
    Chart.create({
        name: req.params.name,
        columns: req.body.columns,
    }, (err, result) => {
        if(err) {
            console.log('There was an error: ' + err)
            res.status(500).send({'success': false})
            return
        }
        console.log('Created: ' + result)
        return next()
    })
}

module.exports = dashboardController;