const { Data } = require("../models/webModel")

const webController = {};

webController.getAll = (req, res, next) => {
    Data.find({}, (err, data) => { 
        if (err) {
            return next("There is an error with data" + JSON.stringify(err));
        }
        res.locals.data = data;
        return next();
    })
}

webController.updateCluster = async (req, res, next) => {
    //put request
    //PUT is for checking if resource is exists then update , else create new resource
    const query = req.body;
    try {
        const result =  await Data.find({data: query});
        
        }
    catch(e){
        return next("There is an error with data" + JSON.stringify(e))
    }
            //if resource exists, update
}
module.exports = webController;