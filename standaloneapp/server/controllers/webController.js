const { Data } = require("../models/webModel")

const webController = {};

webController.getAll = (req, res, next) => {
    //possibly come back to
    Data.find({}, (err, data) => { 
        if (err) {
            //status: 500, log, message
            return next({status:500, log:'There was an error', message: err.message});
        }
        res.locals.data = data;
        return next();
    })
}

webController.createCluster = (req, res, next) => {
    Data.create({
        name: req.body.name, 
        ipAddress: req.body.ipAddress, 
        port: req.body.port
    }, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({'success': false})
            return;
        }
    console.log('Created: ' + result);
    return next()
   
})
}

webController.updateCluster = (req, res, next) => {
    //put request
    //PUT is for checking if resource is exists then update , else create new resource
    const newData = req.body;
    console.log('This is in update ' + req.params.name)
    Data.findOneAndUpdate({name: req.params.name}, newData, (err, result) => {
        if(err || !result){
            res.status(500).send({'success': false})
            return;
        }
        return next()
})
}


webController.deleteCluster = (req, res, next) => {
    console.log(req.body)
    Data.findOneAndDelete({name: req.params.name}, (err, result) => {
        if(err || !result){
            console.log(err)
            res.status(500).send({'success': false})
            return;
        }
        console.log('Deleted: ' + result)
        return next();
    })
}


module.exports = webController;
