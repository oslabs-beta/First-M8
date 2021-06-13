const express = require('express');
const historyController = require("../controllers/historyController.js")
const { History } = require("../models/webModel.js");
const router = express.Router();

router.get("/all", historyController.getHistory, (req, res) => {
    res.status(200).send(res.locals.history);
});

router.delete("/delete/:history_id", 
historyController.deleteOneHistory, (req, res) => {
    res.status(200).send(res.locals.delete);
})

router.post('/add', (req, res) => {
    //can add more in .create to add in more data as needed
    //dummy test post request
    console.log(req.body)
    History.create({name: 'hi', promqlHis: {bucket: "nisa"} }, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({'success': false})
            return;
        }
    console.log('Created: ' + result);
    res.status(200).send({'success': true});
})});
module.exports = router;