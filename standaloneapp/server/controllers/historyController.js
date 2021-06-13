const {History} = require("../models/webModel.js");

const historyController = {};

historyController.getHistory = (req, res, next) => {
    History.find({}, (err, history) => {
        if (err) {
            return next({status: 500, log: "There was an error", message: err.message})
        }
        console.log(req.body);
        res.locals.history = history;
        console.log(res.locals.history);
        return next();
    })
}


historyController.deleteOneHistory = (req, res, next) => {
    const { history_id } = req.params;

    History.findOneAndDelete({_id: history_id}, (err, result) => {
        if (err || !result) {
            console.log(err);
            return next({status: 500, log: "There was an error", message: err.message});
        }
        
        res.locals.delete = result;
        return next();
    })
}

module.exports = historyController;