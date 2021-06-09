const express = require('express');
const webController = require("../controllers/webController");
const { Data } = require('../models/webModel');
const router = express.Router();

router.post('/add', (req, res) => {
    //can add more in .create to add in more data as needed
    //dummy test post request
    console.log(req.body)
    Data.create({name: 'hi', ipAddress: '1.1.1.1', port: 3000}, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({'success': false})
            return;
        }
    console.log('Created: ' + result);
    res.status(200).send({'success': true});
})});

router.get('/all', webController.getAll, (req, res) => { 
    //insert query to database
    //all "cluster" information
    res.status(200).send(res.locals.data)},
);

router.post('/new', webController.createCluster, (req, res) => {
    res.status(200).send({'success': true});
});

router.put('/:name', webController.updateCluster, (req, res) => {
    res.status(200).send({'success': true})
 });

router.delete('/:name', webController.deleteCluster, (req, res) => {
    res.status(200).send({'success': true})
})

module.exports = router;