/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const { ChartSetting, Data } = require('../models/webModel');
const { Display } = require('../models/webModel');

const dashboardController = {};

/*
gets chart settings for a particular chart name
*/
dashboardController.getChartSetting = (req, res, next) => {
  ChartSetting.findOne({ name: req.params.name }, (err, data) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    res.locals.chartSetting = data;
    return next();
  });
};

/*
confirms whether or not chart name already exists
*/
dashboardController.findAndComfirm = (req, res, next) => {
  if (res.locals.data === null) {
    res.locals.chartExists = { found: false };
  } else res.locals.chartExists = { found: true };
  return next();
};

/*
gets display for a particular Prometheus instance
*/
dashboardController.getAllDisplay = (req, res, next) => {
  Display.find({ instance: req.params.instance }, (err, data) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    res.locals.data = data;
    return next();
  });
};

/*
updates display for a particular Prometheus instance if one exists
if not, creates a new document for the Prometheus instance
*/
dashboardController.updateAllDisplay = async (req, res, next) => {
  if (req.body.display && Array.isArray(req.body.display)) {
    await Display.findOneAndUpdate(
      { instance: req.params.instance },
      { display: req.body.display },
      (err, display) => {
        if (!display) {
          Display.create(
            { instance: req.params.instance, display: req.body.display },
            (err, result) => {
              if (err) {
                return res.status(500).send({ success: false });
              }
              return next();
            },
          );
        } else if (err) {
          return res.status(500).send({ success: false });
        } else {
          return next();
        }
      },
    );
  } else {
    return res.status(500).send({ success: false });
  }
};

/*
creates a new document for chart setting for a new chart
*/
dashboardController.createChartSetting = (req, res, next) => {
  console.log(req.body);
  ChartSetting.create(
    {
      name: req.params.name,
      columns: req.body.columns,
      filters: req.body.filters,
    },
    (err, result) => {
      if (err) {
        console.log(`There was an error: ${err}`);
        res.status(500).send({ success: false });
        return;
      }
      console.log(`Created: ${result}`);
      return next();
    },
  );
};

/*
checks whether or not a previous query in a previous middleware
had results
*/
dashboardController.checkIfChartExists = (req, res, next) => {
  if (res.locals.chartSetting !== null) {
    res.locals.chartExists = { found: true };
  } else {
    res.locals.chartExists = { found: false };
  }
  return next();
};

/*
deletes chart setting for a particular chart name
*/
dashboardController.deleteChartSetting = (req, res, next) => {
  ChartSetting.findOneAndDelete({ name: req.params.name }, (err, data) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    return next();
  });
};

/*
deletes single display element from a document for a particular
Prometheus instance
*/
dashboardController.deleteSingleDisplay = (req, res, next) => {
  const allDisplay = res.locals.data[0].display;
  const updatedDisplays = allDisplay.slice();
  for (let index = 0; index < allDisplay.length; index += 1) {
    const currentDisplay = allDisplay[index];
    if (currentDisplay[0].props.id === req.params.name) {
      updatedDisplays.splice(index, 1);
      break;
    }
  }
  res.locals.data = updatedDisplays;
  Display.findOneAndUpdate(
    { instance: req.params.instance },
    { display: updatedDisplays },
    (err, result) => {
      if (err) {
        return next({ status: 500, log: 'There was an error', message: err.message });
      }
      return next();
    },
  );
};

/*
updates chart setting for a particular chart name
*/
dashboardController.updateChartSetting = (req, res, next) => {
  ChartSetting.findOneAndUpdate(
    { name: req.params.name },
    { columns: req.body.columns, name: req.body.name, filters: req.body.filters },
    (err, result) => {
      if (err) {
        return next({ status: 500, log: 'There was an error', message: err.message });
      }
      return next();
    },
  );
};

/*
updates single display element from a document for a particular
Prometheus instance
*/
dashboardController.updateSingleDisplay = (req, res, next) => {
  const updatedDisplays = [];
  Display.find({ instance: req.body.instance }, (err, result) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    result[0].display.forEach((chart) => {
      updatedDisplays.push(chart);
    });
    for (let index = 0; index < updatedDisplays.length; index += 1) {
      const currentDisplay = updatedDisplays[index];
      if (currentDisplay[0].props.id === req.params.name) {
        updatedDisplays.splice(index, 1, req.body.updatedChart);
        break;
      }
    }
    Display.findOneAndUpdate(
      { instance: req.body.instance },
      { display: updatedDisplays },
      (err, result) => {
        if (err) {
          return next({ status: 500, log: 'There was an error', message: err.message });
        }
        return next();
      },
    );
  });
};

/*
gets info for all Prometheus instances
*/
dashboardController.getAllPrometheusInstances = (req, res, next) => {
  Data.find({}, (err, result) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    res.locals.allPrometheusInstances = result;
    return next();
  });
};

/*
gets info for a particular Prometheus instance name
*/
dashboardController.getPrometheusInstance = (req, res, next) => {
  Data.findOne({ name: req.params.name }, (err, result) => {
    if (err) {
      return next({ status: 500, log: 'There was an error', message: err.message });
    }
    console.log('main app prom instance', result);
    res.locals.prometheusInstance = result;
    return next();
  });
};

module.exports = dashboardController;
