const { ChartSetting } = require("../models/webModel")
const { Display } = require("../models/webModel")

const dashboardController = {}

dashboardController.getAllSetting = (req, res, next) => {
    //possibly come back to
    ChartSetting.find({}, (err, data) => { 
        if (err) {
            //status: 500, log, message
            return next({status:500, log:'There was an error', message: err.message});
        }
        res.locals.data = data;
        return next();
    })
}

dashboardController.getAllDisplay = (req, res, next) => {
    //possibly come back to
    Display.find({}, (err, data) => { 
        if (err) {
            //status: 500, log, message
            return next({status:500, log:'There was an error', message: err.message});
        }
        res.locals.data = data;
        return next();
    })
}

dashboardController.updateChart = async (req, res, next) => {
    //PUT request to update all charts
    if(req.body.display && Array.isArray(req.body.display)){
    const newDisplay = req.body;
    await Display.findOneAndUpdate({}, newDisplay, (err, display) => {
        if(!display) {
            Display.create(newDisplay, (err, result) => {
                if(err){
                    return res.status(500).send({'success': false});
                    
                }
                return next();
        })}
        else if(err){
            res.status(500).send({'success': false});
            return;
        } else {
            return next();
        }
    })} else {
        return res.status(500).send({'success': false})
    }
}

dashboardController.createChart = (req, res, next) => {
    //insert DB stuff
    //send back a confirmation object similar to what alex mentioned
    //{'success': true || false}
    console.log(req.body)
    ChartSetting.create({
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