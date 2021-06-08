const { ChartSetting } = require("../models/webModel")
const { Display } = require("../models/webModel")

const dashboardController = {}

dashboardController.getChartSetting = (req, res, next) => {
    //possibly come back to
    ChartSetting.findOne({name: req.params.name}, (err, data) => { 
        if (err) {
            //status: 500, log, message
            return next({status:500, log:'There was an error', message: err.message});
        }
        res.locals.chartSetting = data;
        return next();
    })
}

dashboardController.findAndComfirm = (req, res, next) => {
    //check if document with passed-in name exists in chartsettings, send back 
    if(res.locals.data === null){
         res.locals.chartExists = {'found': false};
    } 
    else res.locals.chartExists = {'found': true};
    return next();
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

dashboardController.updateAllDisplay = async (req, res, next) => {
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

dashboardController.createChartSetting = (req, res, next) => {
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

dashboardController.checkIfChartExists = (req, res, next) => {
    if (res.locals.chartSetting !== null) {
        res.locals.chartExists = {found: true};
    } else {
        res.locals.chartExists = {found: false};
    }
    return next();
}

dashboardController.deleteChartSetting = (req, res, next) => {
    ChartSetting.findOneAndDelete({name: req.params.name}, (err, data) => {
        if (err) {
            return next({status:500, log:'There was an error', message: err.message});
        }
        return next()
    });
}

dashboardController.deleteSingleDisplay = (req, res, next) => {
    const allDisplay = res.locals.data[0].display;
    const updatedDisplays = allDisplay.slice();
    for (let index = 0; index < allDisplay.length; index++) {
        const currentDisplay = allDisplay[index];
        if (currentDisplay[0].props.id === req.params.name) {
            updatedDisplays.splice(index, 1);
            break;
        }
    }
    res.locals.data = updatedDisplays;
    Display.findOneAndUpdate({}, {display: updatedDisplays}, (err, result) => {
        if (err) {
            return next({status:500, log:'There was an error', message: err.message});
        }
        return next();
    })
}

dashboardController.updateChartSetting = (req, res, next) => {
    ChartSetting.findOneAndUpdate({name: req.params.name}, {columns: req.body.columns, name: req.body.name}, (err, result) => {
        if (err) {
            return next({status:500, log:'There was an error', message: err.message});
        }
        return next();
    });
}

dashboardController.updateSingleDisplay = (req, res, next) => {
    const updatedDisplays = [];
    Display.find({}, (err, result) => {
        if (err) {
            return next({status:500, log:'There was an error', message: err.message})
        }
        result[0].display.forEach(chart => {
            updatedDisplays.push(chart);
        })
        for (let index = 0; index < updatedDisplays.length; index++) {
            const currentDisplay = updatedDisplays[index];
            if (currentDisplay[0].props.id === req.params.name) {
                updatedDisplays.splice(index, 1, req.body.updatedChart);
                break;
            }
        }
        Display.findOneAndUpdate({}, {display: updatedDisplays}, (err, result) => {
            if (err) {
                return next({status:500, log:'There was an error', message: err.message});
            }
            return next();
        })
    })
}

module.exports = dashboardController;