const express = require('express');
const webController = require("../controllers/webController");
const router = express.Router();
//finish setting up routes
//yeehaw
//Basic routers, edit, copy, remove as needed
router.get('/', webController.getAll, (req, res) => res.status(200).send(res.locals.data)
    //insert query to database
    //all "cluster" information
);

router.post('/settings/new', (req, res) => {
    //insert DB stuff
    //will contain name, ipAddress, port
        res.status(200).json(res.locals.somethingsomethingDarkSide)
    }
);

router.put('/settings/:name', (req, res) => res.status(200).send(res.locals.somethingsomethingDarkSide)
    //insert query to database
    //updates cluster with either name, ipAddress or port
);

//Basic get setup
router.get('/', (req, res) => res.status(200).send(res.locals.somethingsomethingDarkSide)
    //insert query to database
);

//Basic delete setup
router.delete('/STANDIN', (req, res) => {
    //insert DB stuff
        res.status(200).json(res.locals.somethingsomethingDarkSide)
    }
)

//Basic post
//POST is always for creating a resource
router.post('/AAAAAAAAA', (req, res) => {
    //insert DB stuff
        res.status(200).json(res.locals.somethingsomethingDarkSide)
    }
)

//Basic put
//PUT is for checking if resource is exists then update , else create new resource
router.put('/settings/:name', (req, res) => res.status(200).send(res.locals.somethingsomethingDarkSide)
    //insert query to database
    //updates cluster with either name, ipAddress or port
);

//Basic patch
//PATCH is always for update a resource
router.patch('/SCREAMING', (req, res) => {
    //insert DB stuff
        res.status(200).json()
    }
)

// [!]Some may need to be .jason(res.locals.somethingsomethingDarkSide)

module.exports = router;